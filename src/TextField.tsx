import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

interface Person {
    first: string,
    last: string
}

interface Props {
    text: string,
    i: number,
    person: Person,
    func?: () => void,
    ok?: boolean,
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<Props> = ({handleChange}) => {
    const [person, setPerson] = useState<Person>({first: '', last: ''});

    const inputRef = useRef<HTMLInputElement>();

    return (
        <div>
            <input ref={inputRef} onChange={handleChange}/>
        </div>
    )
}