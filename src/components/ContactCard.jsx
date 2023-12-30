import { useState } from "react";

import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";

import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import AddandUpdateContact from "./AddandUpdateContact";
import useDisclose from "../Hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const {isOpen, onClose,onOpen} = useDisclose();



  return (
    <>
      <div>
        <div
          key={contact.id}
          className="bg-yellow p-2 rounded-lg flex 
            justify-between items-center "
        >
          <div className="flex gap-1 items-center ">
            <HiOutlineUserCircle className="text-orange text-4xl " />
            <div className="">
              <h2 className="font-medium">{contact.name}</h2>
              <p className="text-sm ">{contact.email}</p>
            </div>
          </div>

          <div className="flex text-3xl ">
            <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
            <IoMdTrash
              onClick={(id) => deleteContact(contact.id)}
              className="text-orange cursor-pointer" 
            />
          </div>
        </div>
      </div>
      <AddandUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
