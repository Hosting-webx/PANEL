import ModalContext from '@/context/ModalContext';
import { Form, Formik, Field as FormikField, FormikHelpers, useField } from 'formik';
import { useContext, useEffect } from 'react';
import { boolean, number, object, string } from 'yup';

import FlashMessageRender from '@/components/FlashMessageRender';
import Field from '@/components/elements/Field';
import FormikFieldWrapper from '@/components/elements/FormikFieldWrapper';
import FormikSwitch from '@/components/elements/FormikSwitch';
import { Textarea } from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import Select from '@/components/elements/Select';
import { Button } from '@/components/elements/button/index';

import asModal from '@/hoc/asModal';

import { httpErrorToHuman } from '@/api/http';
import createOrUpdateScheduleTask from '@/api/server/schedules/createOrUpdateScheduleTask';
import { Schedule, Task } from '@/api/server/schedules/getServerSchedules';

import { ServerContext } from '@/state/server';

import useFlash from '@/plugins/useFlash';

interface Props {
    schedule: Schedule;
    // If a task is provided we can assume we're editing it. If not provided,
    // we are creating a new one.
    task?: Task;
}

interface Values {
    action: string;
    payload: string;
    timeOffset: string;
    continueOnFailure: boolean;
}

const schema = object().shape({
    action: string().required().oneOf(['command', 'power', 'backup']),
    payload: string().when('action', {
        is: (v) => v !== 'backup',
        then: () => string().required('A task payload must be provided.'),
        otherwise: () => string(),
    }),
    continueOnFailure: boolean(),
    timeOffset: number()
        .typeError('The time offset must be a valid number between 0 and 900.')
        .required('A time offset value must be provided.')
        .min(0, 'The time offset must be at least 0 seconds.')
        .max(900, 'The time offset must be less than 900 seconds.'),
});

const ActionListener = () => {
    const [{ value }, { initialValue: initialAction }] = useField<string>('action');
    const [, { initialValue: initialPayload }, { setValue, setTouched }] = useField<string>('payload');

    useEffect(() => {
        if (value !== initialAction) {
            setValue(value === 'power' ? 'start' : '');
            setTouched(false);
        } else {
            setValue(initialPayload || '');
            setTouched(false);
        }
    }, [value]);

    return null;
};

const TaskDetailsModal = ({ schedule, task }: Props) => {
    const { dismiss } = useContext(ModalContext);
    const { clearFlashes, addError } = useFlash();

    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const appendSchedule = ServerContext.useStoreActions((actions) => actions.schedules.appendSchedule);
    const backupLimit = ServerContext.useStoreState((state) => state.server.data!.featureLimits.backups);

    useEffect(() => {
        return () => {
            clearFlashes('schedule:task');
        };
    }, []);

    const submit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes('schedule:task');
        if (backupLimit === 0 && values.action === 'backup') {
            setSubmitting(false);
            addError({
                message: "A backup task cannot be created when the server's backup limit is set to 0.",
                key: 'schedule:task',
            });
        } else {
            createOrUpdateScheduleTask(uuid, schedule.id, task?.id, values)
                .then((task) => {
                    let tasks = schedule.tasks.map((t) => (t.id === task.id ? task : t));
                    if (!schedule.tasks.find((t) => t.id === task.id)) {
                        tasks = [...tasks, task];
                    }

                    appendSchedule({ ...schedule, tasks });
                    dismiss();
                })
                .catch((error) => {
                    console.error(error);
                    setSubmitting(false);
                    addError({ message: httpErrorToHuman(error), key: 'schedule:task' });
                });
        }
    };

    return (
        <Formik
            onSubmit={submit}
            validationSchema={schema}
            initialValues={{
                action: task?.action || 'command',
                payload: task?.payload || '',
                timeOffset: task?.timeOffset.toString() || '0',
                continueOnFailure: task?.continueOnFailure || false,
            }}
        >
            {({ isSubmitting, values }) => (
                <Form>
                    <FlashMessageRender byKey={'schedule:task'} />
                    <h2 className={`text-2xl mb-6`}>{task ? 'Edit Task' : 'Create Task'}</h2>
                    <div className={`flex`}>
                        <div className={`mr-2 w-1/3`}>
                            <Label>Action</Label>
                            <ActionListener />
                            <FormikFieldWrapper name={'action'}>
                                <FormikField
                                    className='px-4 py-2 bg-[#ffffff11] rounded-sm'
                                    as={Select}
                                    name={'action'}
                                >
                                    <option className='bg-black' value={'command'}>
                                        Send command
                                    </option>
                                    <option className='bg-black' value={'power'}>
                                        Send power action
                                    </option>
                                    <option className='bg-black' value={'backup'}>
                                        Create backup
                                    </option>
                                </FormikField>
                            </FormikFieldWrapper>
                        </div>
                        <div className={`flex-1 ml-6`}>
                            <Field
                                name={'timeOffset'}
                                label={'Time offset (in seconds)'}
                                description={
                                    'The amount of time to wait after the previous task executes before running this one. If this is the first task on a schedule this will not be applied.'
                                }
                            />
                        </div>
                    </div>
                    <div className={`mt-6`}>
                        {values.action === 'command' ? (
                            <div>
                                <Label>Payload</Label>
                                <FormikFieldWrapper name={'payload'}>
                                    <FormikField
                                        className='w-full rounded-2xl p-2 bg-[#ffffff11]'
                                        as={Textarea}
                                        name={'payload'}
                                        rows={6}
                                    />
                                </FormikFieldWrapper>
                            </div>
                        ) : values.action === 'power' ? (
                            <div>
                                <Label>Payload</Label>
                                <FormikFieldWrapper name={'payload'}>
                                    <FormikField
                                        className='px-4 py-2 bg-[#ffffff11] rounded-sm'
                                        as={Select}
                                        name={'payload'}
                                    >
                                        <option className='bg-black' value={'start'}>
                                            Start the server
                                        </option>
                                        <option className='bg-black' value={'restart'}>
                                            Restart the server
                                        </option>
                                        <option className='bg-black' value={'stop'}>
                                            Stop the server
                                        </option>
                                        <option className='bg-black' value={'kill'}>
                                            Terminate the server
                                        </option>
                                    </FormikField>
                                </FormikFieldWrapper>
                            </div>
                        ) : (
                            <div>
                                <Label>Ignored Files</Label>
                                <FormikFieldWrapper
                                    name={'payload'}
                                    description={
                                        'Optional. Include the files and folders to be excluded in this backup. By default, the contents of your .pteroignore file will be used. If you have reached your backup limit, the oldest backup will be rotated.'
                                    }
                                >
                                    <FormikField
                                        className='w-full rounded-2xl p-2 bg-[#ffffff11]'
                                        as={Textarea}
                                        name={'payload'}
                                        rows={6}
                                    />
                                </FormikFieldWrapper>
                            </div>
                        )}
                    </div>
                    <div className={`mt-6 bg-zinc-700 border border-zinc-800 shadow-inner p-4 rounded`}>
                        <FormikSwitch
                            name={'continueOnFailure'}
                            description={'Future tasks will be run when this task fails.'}
                            label={'Continue on Failure'}
                        />
                    </div>
                    <div className={`flex justify-end mt-6`}>
                        <Button type={'submit'} disabled={isSubmitting}>
                            {task ? 'Save Changes' : 'Create Task'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default asModal<Props>()(TaskDetailsModal);
