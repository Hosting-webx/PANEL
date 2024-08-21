import { Field, Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';

import Button from '@/components/elements/Button';
import FormikFieldWrapper from '@/components/elements/FormikFieldWrapper';
import Input from '@/components/elements/Input';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';

import { createSSHKey, useSSHKeys } from '@/api/account/ssh-keys';

import { useFlashKey } from '@/plugins/useFlash';

interface Values {
    name: string;
    publicKey: string;
}

export default () => {
    const { clearAndAddHttpError } = useFlashKey('account');
    const { mutate } = useSSHKeys();

    const submit = (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
        clearAndAddHttpError();

        createSSHKey(values.name, values.publicKey)
            .then((key) => {
                resetForm();
                mutate((data) => (data || []).concat(key));
            })
            .catch((error) => clearAndAddHttpError(error))
            .then(() => setSubmitting(false));
    };

    return (
        <>
            <Formik
                onSubmit={submit}
                initialValues={{ name: '', publicKey: '' }}
                validationSchema={object().shape({
                    name: string().required(),
                    publicKey: string().required(),
                })}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <SpinnerOverlay visible={isSubmitting} />
                        <FormikFieldWrapper label={'SSH Key Name'} name={'name'}>
                            <Field name={'name'} as={Input} />
                        </FormikFieldWrapper>
                        <FormikFieldWrapper
                            label={'Public Key'}
                            name={'publicKey'}
                            description={'Enter your public SSH key.'}
                        >
                            <Field name={'publicKey'} />
                        </FormikFieldWrapper>
                        <div className={`flex justify-end mt-6`}>
                            <Button>Save</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
