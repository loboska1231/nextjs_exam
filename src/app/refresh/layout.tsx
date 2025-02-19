import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "refresh",
    description: "refresh page description"
};
type Props = { children: React.ReactNode }
export default function RootLayout({children}: Props) {
    return (
        <>
            {children}
        </>
    );
}