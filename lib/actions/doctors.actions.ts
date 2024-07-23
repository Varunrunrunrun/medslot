"use server";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";



import {
    APPOINTMENT_COLLECTION_ID,
    BUCKET_ID,
    DATABASE_ID,
    databases,
    ENDPOINT,
    messaging,
    PROJECT_ID,
    storage,
    DOCTOR_COLLECTION_ID
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

export const getDoctorsList = async () => {
    try {
        const appointment = await databases.listDocuments(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
        );

        return parseStringify(appointment);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the doctor list:",
            error
        );
    }
};