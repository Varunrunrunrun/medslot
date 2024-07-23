"use server";
import { ID, Query } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, DOCTOR_LIST_COLLECTION_ID, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file"

export const createUser = async (user: CreateUserParams) => {
    try {
        // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        console.log({ newUser });
        return parseStringify({ ...newUser, message: "new user", code: 1 });
    } catch (error: any) {
        // Check existing user
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return { ...existingUser?.users[0], message: "existing user", code: 2 };
        }
        console.error("An error occurred while creating a new user:", error);
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the user details:",
            error
        );
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const existingUser = await users.list([
            Query.equal("email", [email]),
        ]);
        return existingUser.users;
    } catch (error) {
        console.error(
            "An error occurred while retrieving the user details:",
            error
        );
    }
}

// REGISTER PATIENT
export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserParams) => {
    try {
        // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
        let file;
        if (identificationDocument) {
            const inputFile =
                identificationDocument &&
                InputFile.fromBuffer(
                    identificationDocument?.get("blobFile") as Blob,
                    identificationDocument?.get("fileName") as string
                );

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }

        console.log("---", DATABASE_ID, PATIENT_COLLECTION_ID)

        // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id ? file.$id : null,
                identificationDocumentUrl: file?.$id
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}/&mmode=admin`
                    : null,
                ...patient,
            }
        );

        return parseStringify(newPatient);
    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);
    }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        );
        if (!patients.documents || patients.documents.length === 0) {
            throw new Error("No patient found with the provided userId");
        }

        console.log(patients);
        return parseStringify(patients.documents[0]);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the patient details:",
            error
        );
    }
};

//GET DOCTOS LIST

export const getDoctorList = async () => {
    try {
        const doctors = await databases.listDocuments(
            DATABASE_ID!,
            DOCTOR_LIST_COLLECTION_ID!,
        );

        return parseStringify(doctors);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the patient details:",
            error
        );
    }
};