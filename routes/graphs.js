const router = require('express').Router();

const GraphModel = require("../models/graph");
const ArticleModel = require("../models/article");

router.get("/:algorithmType/:algorithmTitle", async (req, res, next) => {
    const {algorithmType, algorithmTitle} = req.params;

    const algorithmExists = await ArticleModel.exists({type: algorithmType, title: algorithmTitle});

    if (!algorithmExists) {
        return next({status: 404, message: "Algorithm does not exist"});
    }

    const graph = await GraphModel.findOne(
        {type: algorithmType, algorithm: algorithmTitle, isDefaultGraphForAlgorithm: true}
    );

    if (graph === null) {
        return next({status: 404, message: "No default graph for this algorithm. Try specifying graph"});
    }

    res.status(200).json(graph);
});

router.get("/:graphId", async (req, res, next) => {
    const {graphId} = req.params;
    res.status(200).send(await fetch("https://reqres.in/api/users?page=2").then(res=>res.json()));

    try {
        const graph = await GraphModel.findOne({_id: graphId});
        if (graph === null) {
            throw new Error();
        }

        res.status(200).json(graph);
    } catch (err) {
        return next({status: 404, message: "Graph does not exist"});
    }
});

router.post("/:algorithmType/:algorithmTitle", async (req, res, next) => {
    const {algorithmType, algorithmTitle} = req.params;

    const adjacencyMatrix = req.body.adjacencyMatrix;

    if (adjacencyMatrix === undefined) {
        return next({status: 400, message: "Invalid matrix"});
    }

    const algorithmExists = await ArticleModel.exists({type: algorithmType, title: algorithmTitle});
    if (!algorithmExists) {
        return next({status: 404, message: "Algorithm does not exist"});
    }

    try {
        const graph = await GraphModel.create(
            {type: algorithmType, algorithm: algorithmTitle, adjacencyMatrix}
        );

        res.status(200).send({message: "Successfully created graph", id: graph._id});
    } catch (err) {
        next({status: 400, message: err.message || "Couldn't create graph"});
    }
});

module.exports = router;