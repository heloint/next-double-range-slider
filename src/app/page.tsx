import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div>
                <h1 className="text-3xl text-center py-2">Mango double thumb range slider exercises</h1>
                <div className="py-2 border rounded border-slate-300 flex justify-center items-center gap-10 w-full h-full">
                    <a
                        className="text-2xl underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        href="/exercise1"
                    >
                        Exercise 1
                    </a>
                    <a
                        className="text-2xl underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        href="/exercise2"
                    >
                        Exercise 2
                    </a>
                </div>
            </div>
        </div>
    );
}
