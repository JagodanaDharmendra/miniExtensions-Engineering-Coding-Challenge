import { Base, FieldSet, Record, Records, Table } from "airtable";

export interface ClassType {
    className: string;
    studentNames: Array<string>;
}

class AirtableHelper {

    public static async LoadDataUsingAPI(studentName: string) {
        const API_KEY = "<Replace ID Here>";
        const BASE_ID = "<Replace ID Here>";

        const result: ClassType[] = [];
        const Airtable = require('airtable');
        const base: Base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
        const tableStudents: Table<FieldSet> = base('Students');
        const tableClasses: Table<FieldSet> = base('Classes');
        const studentData: Record<FieldSet> = (await tableStudents.select({
            filterByFormula: `({Name}='${studentName}')`
        }).firstPage())[0];

        console.log(studentData.fields);

        let classesList: string[] = studentData.fields.Classes as string[];

        console.log(classesList);
        for (let iPos = 0; iPos < classesList.length; iPos++) {
            result.push(await AirtableHelper.getDataByClass(tableClasses, tableStudents, classesList[iPos]));
        }
        console.log(result);
        return result;
    }

    public static async getDataByClass(classTable: Table<FieldSet>, studentsTable: Table<FieldSet>, id: string) {
        let finalObject: ClassType = {
            className: '',
            studentNames: []
        };
        const classFields: FieldSet = (await classTable.find(id)).fields;
        console.log(classFields);
        finalObject.className = classFields.Name as string;
        const students: string[] = classFields.Students as string[];
        for (let i = 0; i < students.length; i++) {
            finalObject.studentNames.push(await AirtableHelper.getNameFromId(studentsTable, students[i]) as string);
        }
        return finalObject;
    }

    public static async getNameFromId(tableName: Table<FieldSet>, id: string) {
        return (await tableName.find(id)).fields.Name;
    }
}

export default AirtableHelper;