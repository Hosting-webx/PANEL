import { HugeIconProps } from './props';

const HugeIconsCloudUp = (props: HugeIconProps) => {
    return (
        <svg
            className={'h-6 w-6' + (props.className ? ` ${props.className}` : '')}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M13.0059 21.25C13.0059 21.8023 12.5581 22.25 12.0059 22.25C11.4536 22.25 11.0059 21.8023 11.0059 21.25L11.0059 16.75L10.4116 16.75C10.236 16.7501 10.0203 16.7503 9.84387 16.7282L9.84053 16.7278C9.71408 16.712 9.13804 16.6402 8.86368 16.0746C8.58872 15.5077 8.89065 15.0076 8.95597 14.8994L8.95841 14.8954C9.05062 14.7424 9.18477 14.5715 9.29511 14.4309L9.31885 14.4007C9.61348 14.0248 9.99545 13.5406 10.3759 13.1496C10.5657 12.9545 10.783 12.7533 11.0139 12.5944C11.2191 12.4532 11.5693 12.25 12 12.25C12.4307 12.25 12.7809 12.4532 12.9861 12.5944C13.217 12.7533 13.4343 12.9545 13.6241 13.1496C14.0046 13.5406 14.3865 14.0248 14.6812 14.4007L14.7049 14.4309C14.8152 14.5715 14.9494 14.7423 15.0416 14.8954L15.044 14.8994C15.1093 15.0076 15.4113 15.5078 15.1363 16.0746C14.862 16.6402 14.2859 16.712 14.1595 16.7278L14.1561 16.7282C13.9797 16.7503 13.764 16.7501 13.5884 16.75L13.0059 16.75L13.0059 21.25Z'
                fill={props.fill}
            />
            <path
                d='M1.25 12.5C1.25 9.85826 3.03106 7.6332 5.45825 6.95919C5.65424 6.90476 5.75224 6.87755 5.80872 6.8197C5.8652 6.76184 5.88991 6.66384 5.93931 6.46783C6.62272 3.75653 9.07671 1.75 12 1.75C15.2149 1.75 17.8628 4.17731 18.2112 7.29924C18.2385 7.54459 18.2522 7.6673 18.3147 7.73828C18.3772 7.80927 18.4989 7.8388 18.7423 7.89786C21.0422 8.45589 22.75 10.5285 22.75 13C22.75 15.8995 20.3995 18.25 17.5 18.25H16.4006C15.942 18.25 15.7126 18.25 15.6826 18.2119C15.6679 18.1933 15.6641 18.1839 15.6617 18.1603C15.6567 18.1121 15.8519 17.9223 16.2425 17.5427C17.2326 16.5804 17.255 14.9976 16.2927 14.0075C15.6442 13.1982 15.0315 12.3422 14.2379 11.6663C13.6086 11.1303 12.8426 10.75 12 10.75C11.1574 10.75 10.3914 11.1303 9.76209 11.6663C8.96846 12.3422 8.35575 13.1982 7.7073 14.0075C6.74496 14.9976 6.76745 16.5804 7.75753 17.5427C8.14807 17.9223 8.34334 18.1121 8.33832 18.1603C8.33587 18.1839 8.33206 18.1933 8.31739 18.2119C8.28737 18.25 8.05801 18.25 7.59942 18.25H7C3.82436 18.25 1.25 15.6756 1.25 12.5Z'
                fill={props.fill}
            />
        </svg>
    );
};

export default HugeIconsCloudUp;
