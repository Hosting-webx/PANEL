import { format, formatDistanceToNow } from 'date-fns';

import Can from '@/components/elements/Can';
import { ContextMenu, ContextMenuTrigger } from '@/components/elements/ContextMenu';
import Spinner from '@/components/elements/Spinner';
import { SocketEvent } from '@/components/server/events';

import { bytesToString } from '@/lib/formatters';

import { ServerBackup } from '@/api/server/types';
// import BackupContextMenu from '@/components/server/backups/BackupContextMenu';
import getServerBackups from '@/api/swr/getServerBackups';

// import Can from '@/components/elements/Can';
import useWebsocketEvent from '@/plugins/useWebsocketEvent';

import BackupContextMenu from './BackupContextMenu';

interface Props {
    backup: ServerBackup;
}

export default ({ backup }: Props) => {
    const { mutate } = getServerBackups();

    useWebsocketEvent(`${SocketEvent.BACKUP_COMPLETED}:${backup.uuid}` as SocketEvent, async (data) => {
        try {
            const parsed = JSON.parse(data);

            await mutate(
                (data) => ({
                    ...data!,
                    items: data!.items.map((b) =>
                        b.uuid !== backup.uuid
                            ? b
                            : {
                                  ...b,
                                  isSuccessful: parsed.is_successful || true,
                                  checksum: (parsed.checksum_type || '') + ':' + (parsed.checksum || ''),
                                  bytes: parsed.file_size || 0,
                                  completedAt: new Date(),
                              },
                    ),
                }),
                false,
            );
        } catch (e) {
            console.warn(e);
        }
    });

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className={`flex bg-[#ffffff11] hover:bg-[#ffffff19] transition duration-100 hover:duration-0 px-6 py-4 rounded-md items-center`}
                >
                    <div className={`flex items-center truncate w-full md:flex-1`}>
                        <div className={`flex flex-col truncate`}>
                            <div className={`flex items-center text-sm mb-1`}>
                                {backup.completedAt !== null && !backup.isSuccessful && (
                                    <span
                                        className={`bg-red-500 py-px px-2 rounded-full text-white text-xs uppercase border border-red-600 mr-2`}
                                    >
                                        Failed
                                    </span>
                                )}
                                <div className={`flex gap-2 items-center justify-center`}>
                                    <p className='break-words truncate text-lg'>{backup.name}</p>
                                    {backup.completedAt !== null ? (
                                        backup.isLocked ? (
                                            <span className='font-bold z-10 rounded-full bg-brand px-2 py-1 text-xs text-white'>
                                                Locked
                                            </span>
                                        ) : null
                                    ) : (
                                        <Spinner size={'small'} />
                                    )}
                                </div>
                            </div>
                            <p className={`mt-1 md:mt-0 text-xs text-zinc-400 font-mono truncate`}>{backup.checksum}</p>
                        </div>
                    </div>
                    <div
                        className={`w-1/6 justify-end flex flex-1 md:flex-none md:w-48 mt-4 md:mt-0 md:ml-8 md:text-center`}
                    >
                        {backup.completedAt !== null && backup.isSuccessful && (
                            <span className={`text-xs hidden sm:inline`}>{bytesToString(backup.bytes)}</span>
                        )}
                    </div>
                    <div className={`w-1/5 justify-end flex flex-1 md:flex-none mt-4 md:mt-0 md:ml-8 md:text-center`}>
                        <p title={format(backup.createdAt, 'ddd, MMMM do, yyyy HH:mm:ss')} className={`text-xs`}>
                            {formatDistanceToNow(backup.createdAt, { includeSeconds: true, addSuffix: true })}
                        </p>
                    </div>
                    <Can action={['backup.download', 'backup.restore', 'backup.delete']} matchAny>
                        {!backup.completedAt ? <></> : <BackupContextMenu backup={backup} />}
                    </Can>
                </div>
            </ContextMenuTrigger>
        </ContextMenu>
    );
};
