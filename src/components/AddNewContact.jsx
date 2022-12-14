import React, {useState} from 'react';
import {useRouter} from 'next/router';
import { searchUser, createNewChat } from '../Firebase';

import Search from './Search';
import ContactList from './ContactList';
import NoContent from './NoContent';
import Loading from './Loading';

const AddNewContact = () => {

    const router = useRouter();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onSearchTermChange = async (searchTerm) => {
        setIsLoading(true);
        await searchUser(searchTerm, setResults);
        setIsLoading(false);
    }

    const onContactClick = async user => {
        const chatId = await createNewChat(user);
        console.log(chatId);
        router.push(`/chats/${chatId}`);
    }

    return(
        <>
            <Search onSearchTermChange={onSearchTermChange} />
            {
                !isLoading 
                ? results.length > 0
                ? <ContactList
                    contacts={results}
                    onContactClick={onContactClick}
                    />
                : <NoContent text='No Results' /> 
                :<Loading />
                
            }
        </>
    )
}

export default AddNewContact;