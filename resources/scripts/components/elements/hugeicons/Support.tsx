import { HugeIconProps } from './props';

const HugeIconsSupport = (props: HugeIconProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill={props.fill}
            className={'h-6 w-6' + (props.className ? ` ${props.className}` : '')}
        >
            <path d='M18.8366 11.2566C19.234 11.2245 19.6363 11.3093 19.9853 11.5053C20.2362 11.6461 20.4235 11.8351 20.5588 11.9901C21.0149 12.544 21.7304 13.4205 22.0041 13.8091C22.2868 14.2104 22.5009 14.5927 22.6193 15.0259C22.7939 15.6652 22.7939 16.3348 22.6193 16.9741C22.4562 17.5711 22.1278 18.0849 21.8002 18.5137C21.6018 18.7733 20.9932 19.4868 20.7814 19.7323C20.5403 20.0265 20.3023 20.3168 19.9853 20.4947C19.6363 20.6906 19.234 20.7755 18.8366 20.7434C18.4789 20.7144 17.9881 20.4904 17.6252 20.3243C17.2691 20.1652 16.5975 19.8652 16.3417 19.1081C16.2487 18.8327 16.2494 18.5384 16.2501 18.2645V13.7355C16.2494 13.4616 16.2487 13.1672 16.3417 12.8919C16.5975 12.1348 17.2691 11.8348 17.6252 11.6757C17.9881 11.5096 18.4789 11.2856 18.8366 11.2566Z' />
            <path d='M5.16338 11.2566C4.76601 11.2245 4.36371 11.3093 4.01467 11.5053C3.76377 11.6461 3.57649 11.8351 3.44114 11.9901C2.98513 12.544 2.2696 13.4205 1.99586 13.8091C1.71321 14.2104 1.49908 14.5927 1.38073 15.0259C1.2061 15.6652 1.2061 16.3348 1.38073 16.9741C1.54383 17.5711 1.87216 18.0849 2.19981 18.5137C2.39817 18.7733 3.00675 19.4868 3.21863 19.7323C3.45968 20.0265 3.69767 20.3168 4.01467 20.4947C4.36371 20.6906 4.76601 20.7755 5.16338 20.7434C5.52108 20.7144 6.01186 20.4904 6.37476 20.3243C6.73092 20.1652 7.40247 19.8652 7.65825 19.1081C7.75127 18.8327 7.75055 18.5384 7.74987 18.2645V13.7355C7.75055 13.4616 7.75127 13.1672 7.65825 12.8919C7.40247 12.1348 6.73092 11.8348 6.37476 11.6757C6.01186 11.5096 5.52108 11.2856 5.16338 11.2566Z' />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.78066 20.0553C9.16431 19.6581 9.79738 19.647 10.1947 20.0307C11.1879 20.9898 12.8121 20.9898 13.8053 20.0307C14.2026 19.647 14.8357 19.6581 15.2193 20.0553C15.603 20.4526 15.5919 21.0857 15.1947 21.4693C13.4264 23.1769 10.5736 23.1769 8.80534 21.4693C8.40806 21.0857 8.39701 20.4526 8.78066 20.0553Z'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 3.1875C7.14239 3.1875 3.20454 7.09103 3.20454 11.9063V15.7812C3.20454 16.3163 2.767 16.75 2.22727 16.75C1.68754 16.75 1.25 16.3163 1.25 15.7812V11.9063C1.25 6.02097 6.06293 1.25 12 1.25C17.937 1.25 22.7499 6.02097 22.7499 11.9063L22.75 15.7812C22.75 16.3163 22.3125 16.75 21.7727 16.75C21.233 16.75 20.7955 16.3163 20.7955 15.7813L20.7954 11.9063C20.7954 7.09103 16.8576 3.1875 12 3.1875Z'
            />
        </svg>
    );
};

export default HugeIconsSupport;
