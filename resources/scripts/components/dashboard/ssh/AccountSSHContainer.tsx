import { format } from 'date-fns';
import { useEffect } from 'react';

import FlashMessageRender from '@/components/FlashMessageRender';
import CreateSSHKeyForm from '@/components/dashboard/ssh/CreateSSHKeyForm';
import DeleteSSHKeyButton from '@/components/dashboard/ssh/DeleteSSHKeyButton';
import ContentBox from '@/components/elements/ContentBox';
import PageContentBlock from '@/components/elements/PageContentBlock';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';

import { useSSHKeys } from '@/api/account/ssh-keys';

import { useFlashKey } from '@/plugins/useFlash';

export default () => {
    const { clearAndAddHttpError } = useFlashKey('account');
    const { data, isValidating, error } = useSSHKeys({
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        clearAndAddHttpError(error);
    }, [error]);

    return (
        <PageContentBlock title={'SSH Keys'}>
            <FlashMessageRender byKey={'account'} />
            <div className={`md:flex flex-nowrap my-10`}>
                <ContentBox title={'Add SSH Key'} className={`flex-none w-full md:w-1/2`}>
                    <CreateSSHKeyForm />
                </ContentBox>
                <ContentBox title={'SSH Keys'} className={`flex-1 overflow-hidden mt-8 md:mt-0 md:ml-8`}>
                    <SpinnerOverlay visible={!data && isValidating} />
                    {!data || !data.length ? (
                        <p className={`text-center text-sm`}>
                            {!data ? 'Loading...' : 'No SSH Keys exist for this account.'}
                        </p>
                    ) : (
                        data.map((key, _) => (
                            <div className='flex flex-col' key={key.fingerprint}>
                                {/* <FontAwesomeIcon icon={faKey} className={`text-zinc-300`} /> */}
                                <div className={`flex-1`}>
                                    <p className={`text-sm break-words font-medium`}>{key.name}</p>
                                    <p className={`text-xs mt-1 font-mono truncate`}>SHA256:{key.fingerprint}</p>
                                    <p className={`text-xs mt-1 text-zinc-300 uppercase`}>
                                        Added on:&nbsp;
                                        {format(key.createdAt, 'MMM do, yyyy HH:mm')}
                                    </p>
                                </div>
                                <DeleteSSHKeyButton name={key.name} fingerprint={key.fingerprint} />
                            </div>
                        ))
                    )}
                </ContentBox>
            </div>
        </PageContentBlock>
    );
};
