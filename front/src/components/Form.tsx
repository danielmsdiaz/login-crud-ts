import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
}

const Form = ({ children }: Props) => {
    return (
        <form className="space-y-4 md:space-y-6" action="">
            {children}
        </form>
    );
}

export default Form