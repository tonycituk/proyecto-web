import { ChangeEvent, useEffect, useState } from "react";

export function useSearch<T>(initialArray: T[], query: string) {

    const [search, setSearch] = useState("");
    const [arrayFiltered, setArrayFiltered] = useState<T[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase());
    }

    useEffect(() => {
        if (search === "") {
            setArrayFiltered(initialArray);
        } else {
            setArrayFiltered(
                initialArray.filter((element: any) => 
                    element[query].toLowerCase().includes(search)
                )
            )
        }
    }, [search]);

    return {
        handleSearch, 
        arrayFiltered
    }
}
