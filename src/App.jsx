import { FiSearch } from 'react-icons/fi';
import Navbar from './components/Navbar';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/Firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { onClose, onOpen, isOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');

        onSnapshot(contactsRef, snapshot => {
          const contactList = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = e => {
    const value = e.target.value;

    const contactsRef = collection(db, 'contacts');

    onSnapshot(contactsRef, snapshot => {
      const contactList = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <div>
      <div className="mx-auto max-w-[360px] px-4">
        <Navbar />
        <div className="relative flex items-center gap-2">
          <FiSearch className="text-white text-3xl ml-1 absolute" />
          <input
            onChange={filterContacts}
            type="text"
            className="flex-grow bg-transparent border border-white rounded-md h-10  text-white pl-9"
          />
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {contacts.length < 1 ? (
            <NotFoundContact />
          ) : (
            contacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
