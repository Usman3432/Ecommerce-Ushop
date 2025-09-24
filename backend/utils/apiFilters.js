class APIFILTERS {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i',
            },
        } : {};

        this.query = this.query.find({ ...keyword })
        return this
    }



    filters(){
        const queryCopy = { ...this.queryStr };

        //Fields to Remove
        const fieldToRemove = ["keyword"];
        fieldToRemove.forEach((el) => delete queryCopy[el]);


        //Advance filters for price ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) =>`$${match}`);


        


        // console.log("===================================");
        // console.log(queryStr);
        // console.log("===================================");

        this.query = this.query.find(JSON.parse(queryStr));
        return this

        
    }

}


export default APIFILTERS