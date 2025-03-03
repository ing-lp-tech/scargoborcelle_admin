/* "use client";

import { useEffect, useState } from "react";

import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";

const ContactDetails = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      console.log("data collections id", data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? (
    <>
      <h1>cargando</h1>
      <Loader />
    </>
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default ContactDetails; */

"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/custom ui/Loader";
import ContactForm from "@/components/contacts/ContactForm";

const ContactDetails = ({ params }: { params: { contactId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState<ContactType | null>(
    null
  );

  const getContactDetails = async () => {
    try {
      const res = await fetch(`/api/contacts/${params.contactId}`, {
        method: "GET",
      });
      const data = await res.json();
      setContactDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[contactId_GET]", err);
    }
  };

  useEffect(() => {
    getContactDetails();
  }, []);

  return loading ? <Loader /> : <ContactForm initialData={contactDetails} />;
};

export default ContactDetails;
