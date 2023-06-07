import { ReactNode, createContext, useState } from "react";

type Props = {
    children: ReactNode,
}

type LoadingContextProps = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextProps>({
    loading: false,
    setLoading: () => {}
})

export const LoadingProvider = ({children}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}
