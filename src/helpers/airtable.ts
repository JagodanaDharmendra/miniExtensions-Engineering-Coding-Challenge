
class AirtableHelper {
    public static getHeader() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer keyzQvBweHZ7S3CVE',
        };
    }

    public static async LoadData(name: string) {
        try {
            const result = await fetch(
                `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?maxRecords=3&view=Grid%20view`,
                {
                    method: 'GET',
                    headers: this.getHeader(),
                },
            );
            const json = await result.json();
            console.log(json);
            return json;
        } catch (e: any) {
            return e;
        }
    }

    public static async LoadClassData(classId: string) {
        try {
            const result = await fetch(
                `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes/${classId}`,
                {
                    method: 'GET',
                    headers: this.getHeader(),
                },
            );
            const json = await result.json();
            console.log(json);
            return json;
        } catch (e: any) {
            console.log(e);
            return null;
        }
    }

    public static async LoadStudentData(studentId: string) {
        try {
            const result = await fetch(
                `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=({Name}='${studentId}')`,
                {
                    method: 'GET',
                    headers: this.getHeader(),
                },
            );
            const json = await result.json();
            console.log(json);
            return json;
        } catch (e: any) {
            console.log(e);
            return null;
        }
    }

    public static LoadStudentDataUsingAPI(studentId: string, onCompleted: (data: any) => void) {
        try {
            var Airtable = require('airtable');
            var base = new Airtable({ apiKey: 'keyzQvBweHZ7S3CVE' }).base('app8ZbcPx7dkpOnP0');
            base('Students').select({
                filterByFormula: `({Name}='${studentId}')`
            }).eachPage(function page(records: any, fetchNextPage: any) {
                onCompleted(records[0].fields);
                // records.forEach(function (record: any) {
                //     console.log('Retrieved', record.fields);
                // });
            }, function done(err: any) {
                if (err) { console.error(err); return; }
            });
        } catch (e: any) {
            console.log(e);
            onCompleted(null);
        }
    }
}

export default AirtableHelper;