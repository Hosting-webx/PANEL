import { Form, Formik, FormikHelpers } from 'formik';
import { join } from 'pathe';

import Field from '@/components/elements/Field';
import Modal, { RequiredModalProps } from '@/components/elements/Modal';
import { Button } from '@/components/elements/button/index';

import renameFiles from '@/api/server/files/renameFiles';

import { ServerContext } from '@/state/server';

import useFileManagerSwr from '@/plugins/useFileManagerSwr';
import useFlash from '@/plugins/useFlash';

interface FormikValues {
    name: string;
}

type OwnProps = RequiredModalProps & { files: string[]; useMoveTerminology?: boolean };

const RenameFileModal = ({ files, useMoveTerminology, ...props }: OwnProps) => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const { mutate } = useFileManagerSwr();
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const directory = ServerContext.useStoreState((state) => state.files.directory);
    const setSelectedFiles = ServerContext.useStoreActions((actions) => actions.files.setSelectedFiles);

    const submit = ({ name }: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        clearFlashes('files');

        const len = name.split('/').length;
        if (files.length === 1) {
            if (!useMoveTerminology && len === 1) {
                // Rename the file within this directory.
                mutate((data) => data!.map((f) => (f.name === files[0] ? { ...f, name } : f)), false);
            } else if (useMoveTerminology || len > 1) {
                // Remove the file from this directory since they moved it elsewhere.
                mutate((data) => data!.filter((f) => f.name !== files[0]), false);
            }
        }

        let data;
        if (useMoveTerminology && files.length > 1) {
            data = files.map((f) => ({ from: f, to: join(name, f) }));
        } else {
            data = files.map((f) => ({ from: f, to: name }));
        }

        renameFiles(uuid, directory, data)
            .then((): Promise<any> => (files.length > 0 ? mutate() : Promise.resolve()))
            .then(() => setSelectedFiles([]))
            .catch((error) => {
                mutate();
                setSubmitting(false);
                clearAndAddHttpError({ key: 'files', error });
            })
            .then(() => props.onDismissed());
    };

    return (
        <Formik onSubmit={submit} initialValues={{ name: files.length > 1 ? '' : files[0] || '' }}>
            {({ isSubmitting, values }) => (
                <Modal {...props} dismissable={!isSubmitting} showSpinnerOverlay={isSubmitting}>
                    <Form className={`m-0 w-full`}>
                        <div className='w-full'>
                            <Field
                                type={'string'}
                                id={'file_name'}
                                name={'name'}
                                label={'File Name'}
                                description={
                                    useMoveTerminology
                                        ? 'Enter the new name and directory of this file or folder, relative to the current directory.'
                                        : undefined
                                }
                                autoFocus
                            />
                            <div className={`flex justify-end w-full my-4`}>
                                <Button>{useMoveTerminology ? 'Move' : 'Rename'}</Button>
                            </div>
                        </div>
                        {useMoveTerminology && (
                            <p className={`text-xs mt-2 text-zinc-400`}>
                                <strong className={`text-zinc-200`}>New location:</strong>
                                &nbsp;/home/container/{join(directory, values.name).replace(/^(\.\.\/|\/)+/, '')}
                            </p>
                        )}
                    </Form>
                </Modal>
            )}
        </Formik>
    );
};

export default RenameFileModal;
