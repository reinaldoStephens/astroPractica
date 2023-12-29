import axios from "axios";
// @ts-ignore
import Papa from "papaparse";

const DOC_DRIVE_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAVoqMK2lRWn3BhKwJlYgyjsz1uF28JbJo-ZeAIyYuU9UE7i0pXKHgZdj3R6DnR8rdlC8-rEl6TsBU/pub?output=csv";

export const list = async () => {
    try {
        return axios
            .get(DOC_DRIVE_URL, {
                responseType: "blob",
            })
            .then((response) => {
                return new Promise((resolve, reject) => {
                    Papa.parse(response.data, {
                        header: true,
                        complete: (results) => resolve(results.data),
                        error: (error) => reject(error.messaje),
                    });
                });
            });
    } catch (e) {
        throw new Error("Error searching movies");
    }
};
