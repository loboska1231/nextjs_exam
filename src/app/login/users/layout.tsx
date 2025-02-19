import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "users",
    description: "users description"
};

type Props = { children: React.ReactNode }
export default function RootLayout({children}: Props) {
    return (
        <>
            {children}
        </>
    );
}