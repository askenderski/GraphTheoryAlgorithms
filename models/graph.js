const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GraphSchema = new Schema({
    algorithm: {
        type: String,
        required: true
    },
    isDefaultGraphForAlgorithm: {
        type: Boolean,
        required: true,
        default: false
    },
    adjacencyMatrix: {
        type: [[Schema.Types.Mixed]],
        required: true,
        validate: {
            validator: function (adjacencyMatrix) {
                if (!Array.isArray(adjacencyMatrix) ||
                    !adjacencyMatrix.every(element=>Array.isArray(element)) ||
                    //every row must have as many elements as the graph has rows (square matrix)
                    adjacencyMatrix.some(row=>row.length !== adjacencyMatrix.length) ||
                    adjacencyMatrix.some((row, rowIndex, graphArr)=>
                        //if some elements have different types from the types of the one after in the same row, the graph is invalid
                        row.some(
                            (element, index, rowArr) =>
                                //the last element will not be compared
                                index < rowArr.length - 1 &&
                                getTypeOf(element) !== getTypeOf(rowArr[index+1])
                        ) ||
                        getTypeOf(row[0]) === "invalid" ||
                        //if the first elements of two rows are of different types, the graph is invalid
                        (rowIndex < graphArr.length - 1 && getTypeOf(row[0]) !== getTypeOf(graphArr[rowIndex+1][0]))
                    )
                ) {
                    throw {status: 400, message: "Invalid matrix"};
                }

                return true;
            },
            message: props => {
                return props;
            },
        }
    },
    type: {
        type: String,
        required: true
    }
}, {collection: "graphs"});

function getTypeOf(element) {
    if (typeof element === "number") {
        return "number";
    }
    if (typeof element === "boolean") {
        return "boolean";
    }

    return "invalid";
}

const GraphModel = mongoose.model('graph', GraphSchema);

module.exports = GraphModel;