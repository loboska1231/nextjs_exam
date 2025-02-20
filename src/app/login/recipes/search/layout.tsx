import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "SEARCH",
    description: "search page"
};
type Props = { children: React.ReactNode }
export default function RootLayout({children}: Props) {
    return (
        <>
            {children}
        </>
    );
}