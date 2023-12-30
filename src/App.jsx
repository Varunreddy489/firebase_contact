import { useState, useEffect } from "react";

import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import ContactCard from "./components/ContactCard";
import AddandUpdateContact from "./components/AddandUpdateContact";
import useDisclose from "./Hooks/useDisclose";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contact, setContact] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");

        onSnapshot(contactRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactRef = collection(db, "contacts");

    onSnapshot(contactRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase() )
      );
      setContact(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2 ">
          <div className="flex relative flex-grow items-center ">
            <FiSearch className="text-white ml-1 text-3xl absolute " />
            <input
            onChange={filterContacts}
              type="text"
              className="flex-grow p-2 h-10 border bg-transparent
           border-white rounded-md text-white pl-10 "
              placeholder="Search Contact"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-white cursor-pointer text-5xl "
          />
        </div>
        <div className="mt-4 gap-3 flex flex-col ">
          { contact.length <=0 ?<NotFoundContact/> :   contact.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddandUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
