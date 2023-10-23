import { FunctionComponent, HTMLAttributes } from 'react'
import { Colors } from '@/types/Colors.d'
import Logo from './Logo'
import cn from '@/utils/cn'

interface Props extends HTMLAttributes<HTMLDivElement> {
  color?: Colors
  height?: number
}

const LogoWithBaseline: FunctionComponent<Props> = ({
  height = 95,
  color = Colors.PRIMARY,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2 w-fit', className)}>
      <Logo color={color} height={height} />

      <svg
        className="self-end"
        width={height * 1.8}
        height={height * 0.1}
        viewBox="0 0 160 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color={color}
      >
        <path
          d="M4.83815 9.0379C4.23642 9.0379 3.67606 8.93636 3.15707 8.73327C2.64559 8.53019 2.20182 8.24813 1.82574 7.88709C1.44966 7.51853 1.15631 7.0898 0.945707 6.60089C0.735102 6.11198 0.629799 5.57795 0.629799 4.99878C0.629799 4.41962 0.735102 3.88558 0.945707 3.39668C1.15631 2.90777 1.44966 2.4828 1.82574 2.12176C2.20182 1.7532 2.64559 1.46738 3.15707 1.2643C3.66854 1.06121 4.2289 0.959671 4.83815 0.959671C5.43988 0.959671 5.99272 1.06121 6.49667 1.2643C7.00814 1.45986 7.45191 1.74192 7.828 2.11048C8.2116 2.47152 8.50494 2.89649 8.70803 3.3854C8.91863 3.8743 9.02393 4.4121 9.02393 4.99878C9.02393 5.58547 8.91863 6.12327 8.70803 6.61217C8.50494 7.10108 8.2116 7.52981 7.828 7.89837C7.45191 8.25941 7.00814 8.54147 6.49667 8.74455C5.99272 8.94012 5.43988 9.0379 4.83815 9.0379ZM4.83815 8.03376C5.2744 8.03376 5.67681 7.95854 6.04537 7.80811C6.42145 7.65768 6.74488 7.44707 7.01566 7.17629C7.29396 6.89799 7.50833 6.57456 7.65876 6.206C7.81671 5.83745 7.89569 5.43504 7.89569 4.99878C7.89569 4.56253 7.81671 4.16012 7.65876 3.79156C7.50833 3.423 7.29396 3.10333 7.01566 2.83256C6.74488 2.55426 6.42145 2.33989 6.04537 2.18946C5.67681 2.03902 5.2744 1.96381 4.83815 1.96381C4.39437 1.96381 3.98444 2.03902 3.60836 2.18946C3.2398 2.33989 2.91637 2.55426 2.63807 2.83256C2.35977 3.10333 2.14165 3.423 1.98369 3.79156C1.83326 4.16012 1.75804 4.56253 1.75804 4.99878C1.75804 5.43504 1.83326 5.83745 1.98369 6.206C2.14165 6.57456 2.35977 6.89799 2.63807 7.17629C2.91637 7.44707 3.2398 7.65768 3.60836 7.80811C3.98444 7.95854 4.39437 8.03376 4.83815 8.03376Z"
          fill="currentColor"
        />
        <path
          d="M17.6645 9.0379C17.0628 9.0379 16.5062 8.94012 15.9947 8.74455C15.4908 8.54147 15.0508 8.25941 14.6747 7.89837C14.3061 7.52981 14.0165 7.10108 13.8059 6.61217C13.5953 6.12327 13.49 5.58547 13.49 4.99878C13.49 4.4121 13.5953 3.8743 13.8059 3.3854C14.0165 2.89649 14.3099 2.47152 14.686 2.11048C15.062 1.74192 15.5021 1.45986 16.006 1.2643C16.5175 1.06121 17.0741 0.959671 17.6758 0.959671C18.2851 0.959671 18.8454 1.06497 19.3569 1.27558C19.8759 1.47866 20.3159 1.78329 20.6769 2.18946L19.9436 2.90025C19.6427 2.58434 19.3042 2.35117 18.9282 2.20074C18.5521 2.04278 18.1497 1.96381 17.7209 1.96381C17.2772 1.96381 16.8635 2.03902 16.4799 2.18946C16.1038 2.33989 15.7766 2.55049 15.4983 2.82127C15.22 3.09205 15.0019 3.41548 14.8439 3.79156C14.6935 4.16012 14.6183 4.56253 14.6183 4.99878C14.6183 5.43504 14.6935 5.84121 14.8439 6.21729C15.0019 6.58585 15.22 6.90552 15.4983 7.17629C15.7766 7.44707 16.1038 7.65768 16.4799 7.80811C16.8635 7.95854 17.2772 8.03376 17.7209 8.03376C18.1497 8.03376 18.5521 7.95854 18.9282 7.80811C19.3042 7.65016 19.6427 7.40947 19.9436 7.08604L20.6769 7.79683C20.3159 8.203 19.8759 8.51138 19.3569 8.72199C18.8454 8.93259 18.2813 9.0379 17.6645 9.0379Z"
          fill="currentColor"
        />
        <path
          d="M25.6712 8.94764V1.04993H28.9995C29.8419 1.04993 30.5828 1.21541 31.2221 1.54636C31.869 1.87731 32.3692 2.33989 32.7227 2.9341C33.0837 3.52831 33.2643 4.21654 33.2643 4.99878C33.2643 5.78103 33.0837 6.46926 32.7227 7.06347C32.3692 7.65768 31.869 8.12026 31.2221 8.45121C30.5828 8.78216 29.8419 8.94764 28.9995 8.94764H25.6712ZM26.7994 7.96607H28.9318C29.5862 7.96607 30.1503 7.84196 30.6242 7.59375C31.1055 7.34553 31.4779 6.99954 31.7411 6.55576C32.0044 6.10446 32.136 5.58547 32.136 4.99878C32.136 4.40458 32.0044 3.88558 31.7411 3.44181C31.4779 2.99803 31.1055 2.65204 30.6242 2.40382C30.1503 2.15561 29.5862 2.0315 28.9318 2.0315H26.7994V7.96607Z"
          fill="currentColor"
        />
        <path
          d="M46.3601 8.94764V2.0315H43.6523V1.04993H50.1848V2.0315H47.477V8.94764H46.3601Z"
          fill="currentColor"
        />
        <path
          d="M54.7984 8.94764V1.04993H57.8785C58.5705 1.04993 59.1609 1.15899 59.6498 1.37712C60.1387 1.59525 60.5148 1.91116 60.7781 2.32485C61.0413 2.73854 61.173 3.2312 61.173 3.80285C61.173 4.37449 61.0413 4.86716 60.7781 5.28085C60.5148 5.68701 60.1387 5.99916 59.6498 6.21729C59.1609 6.43541 58.5705 6.54448 57.8785 6.54448H55.4189L55.9266 6.02549V8.94764H54.7984ZM60.0786 8.94764L58.0703 6.0819H59.2775L61.3083 8.94764H60.0786ZM55.9266 6.13831L55.4189 5.58547H57.8446C58.5667 5.58547 59.112 5.43128 59.4806 5.12289C59.8567 4.80698 60.0447 4.36697 60.0447 3.80285C60.0447 3.23872 59.8567 2.80247 59.4806 2.49408C59.112 2.1857 58.5667 2.0315 57.8446 2.0315H55.4189L55.9266 1.46738V6.13831Z"
          fill="currentColor"
        />
        <path
          d="M65.1846 8.94764L68.7611 1.04993H69.8781L73.4659 8.94764H72.2812L69.0883 1.68175H69.5396L66.3467 8.94764H65.1846ZM66.7077 6.97321L67.0123 6.07062H71.4576L71.7848 6.97321H66.7077Z"
          fill="currentColor"
        />
        <path
          d="M81.45 9.0379C80.8482 9.0379 80.2916 8.94012 79.7802 8.74455C79.2762 8.54147 78.8362 8.25941 78.4601 7.89837C78.0916 7.52981 77.802 7.10108 77.5914 6.61217C77.3808 6.12327 77.2755 5.58547 77.2755 4.99878C77.2755 4.4121 77.3808 3.8743 77.5914 3.3854C77.802 2.89649 78.0953 2.47152 78.4714 2.11048C78.8475 1.74192 79.2875 1.45986 79.7915 1.2643C80.3029 1.06121 80.8595 0.959671 81.4613 0.959671C82.0705 0.959671 82.6309 1.06497 83.1423 1.27558C83.6613 1.47866 84.1013 1.78329 84.4624 2.18946L83.729 2.90025C83.4282 2.58434 83.0897 2.35117 82.7136 2.20074C82.3375 2.04278 81.9351 1.96381 81.5064 1.96381C81.0626 1.96381 80.6489 2.03902 80.2653 2.18946C79.8892 2.33989 79.562 2.55049 79.2837 2.82127C79.0054 3.09205 78.7873 3.41548 78.6294 3.79156C78.4789 4.16012 78.4037 4.56253 78.4037 4.99878C78.4037 5.43504 78.4789 5.84121 78.6294 6.21729C78.7873 6.58585 79.0054 6.90552 79.2837 7.17629C79.562 7.44707 79.8892 7.65768 80.2653 7.80811C80.6489 7.95854 81.0626 8.03376 81.5064 8.03376C81.9351 8.03376 82.3375 7.95854 82.7136 7.80811C83.0897 7.65016 83.4282 7.40947 83.729 7.08604L84.4624 7.79683C84.1013 8.203 83.6613 8.51138 83.1423 8.72199C82.6309 8.93259 82.0667 9.0379 81.45 9.0379Z"
          fill="currentColor"
        />
        <path
          d="M90.4495 7.04091L90.3931 5.66445L94.8722 1.04993H96.1584L92.6947 4.70544L92.0629 5.40495L90.4495 7.04091ZM89.4566 8.94764V1.04993H90.5849V8.94764H89.4566ZM95.0527 8.94764L91.8147 5.1793L92.5706 4.3444L96.3727 8.94764H95.0527Z"
          fill="currentColor"
        />
        <path
          d="M101.977 4.45723H106.039V5.41623H101.977V4.45723ZM102.079 7.96607H106.682V8.94764H100.951V1.04993H106.524V2.0315H102.079V7.96607Z"
          fill="currentColor"
        />
        <path
          d="M111.894 8.94764V1.04993H114.974C115.666 1.04993 116.256 1.15899 116.745 1.37712C117.234 1.59525 117.61 1.91116 117.873 2.32485C118.137 2.73854 118.268 3.2312 118.268 3.80285C118.268 4.37449 118.137 4.86716 117.873 5.28085C117.61 5.68701 117.234 5.99916 116.745 6.21729C116.256 6.43541 115.666 6.54448 114.974 6.54448H112.514L113.022 6.02549V8.94764H111.894ZM117.174 8.94764L115.166 6.0819H116.373L118.404 8.94764H117.174ZM113.022 6.13831L112.514 5.58547H114.94C115.662 5.58547 116.207 5.43128 116.576 5.12289C116.952 4.80698 117.14 4.36697 117.14 3.80285C117.14 3.23872 116.952 2.80247 116.576 2.49408C116.207 2.1857 115.662 2.0315 114.94 2.0315H112.514L113.022 1.46738V6.13831Z"
          fill="currentColor"
        />
        <path
          d="M128.695 8.94764L132.271 1.04993H133.388L136.976 8.94764H135.791L132.598 1.68175H133.05L129.857 8.94764H128.695ZM130.218 6.97321L130.522 6.07062H134.968L135.295 6.97321H130.218Z"
          fill="currentColor"
        />
        <path
          d="M141.539 8.94764V1.04993H144.619C145.311 1.04993 145.901 1.15899 146.39 1.37712C146.879 1.59525 147.255 1.91116 147.518 2.32485C147.782 2.73854 147.913 3.2312 147.913 3.80285C147.913 4.37449 147.782 4.86716 147.518 5.28085C147.255 5.68701 146.879 6.00292 146.39 6.22857C145.901 6.4467 145.311 6.55576 144.619 6.55576H142.159L142.667 6.02549V8.94764H141.539ZM142.667 6.13831L142.159 5.57419H144.585C145.307 5.57419 145.852 5.42 146.221 5.11161C146.597 4.80322 146.785 4.36697 146.785 3.80285C146.785 3.23872 146.597 2.80247 146.221 2.49408C145.852 2.1857 145.307 2.0315 144.585 2.0315H142.159L142.667 1.46738V6.13831Z"
          fill="currentColor"
        />
        <path
          d="M152.956 8.94764V1.04993H156.036C156.728 1.04993 157.318 1.15899 157.807 1.37712C158.296 1.59525 158.672 1.91116 158.935 2.32485C159.199 2.73854 159.33 3.2312 159.33 3.80285C159.33 4.37449 159.199 4.86716 158.935 5.28085C158.672 5.68701 158.296 6.00292 157.807 6.22857C157.318 6.4467 156.728 6.55576 156.036 6.55576H153.576L154.084 6.02549V8.94764H152.956ZM154.084 6.13831L153.576 5.57419H156.002C156.724 5.57419 157.269 5.42 157.638 5.11161C158.014 4.80322 158.202 4.36697 158.202 3.80285C158.202 3.23872 158.014 2.80247 157.638 2.49408C157.269 2.1857 156.724 2.0315 156.002 2.0315H153.576L154.084 1.46738V6.13831Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export default LogoWithBaseline