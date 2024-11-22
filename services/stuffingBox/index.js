const {StuffingBoxSchema} = require("../../models/stuffing-box");

const getAll = async () => {
    return StuffingBoxSchema.find({}).sort({name: 1});
};

const getByName = async (name) => {
    if (!name) {
        throw new Error("Name must be provided");
    }
    const query = {name: {$regex: `.*${name}.*`, $options: "i"}};
    const result = await StuffingBoxSchema.findOne(query);

    if (!result) {
        throw new Error("Element not found");
    }

    return result;
};

const getAnalogs = async (name) => {
    const element = await getByName(name);
    const elements = await getAll();
    console.log("elements", elements);
    console.log('element', element);

    const tolerance = 0.3;
    const toleranceH = 2.2;

    const areAnalogs = (element1, element2) => {
        const isWithinTolerance = (value1, value2) =>
            Math.abs(parseFloat(value1) - parseFloat(value2)) <= tolerance;
        const isWithinToleranceH = (value1, value2) =>
            Math.abs(parseFloat(value1) - parseFloat(value2)) <= toleranceH;

        return (
            isWithinTolerance(element1.d1, element2.d1) &&
            isWithinTolerance(element1.D, element2.D) &&
            isWithinToleranceH(element1.H, element2.H)
        );
    };

    const analogs = [];

    elements.forEach((el) => {
        if (areAnalogs(element, el) && element._id !== el._id) {
            analogs.push(el);
        }
    });

    console.log(analogs)

    return analogs;
};

const createNew = async (name, type, position, d1, d2, D, h1, H) => {
    const existing = await StuffingBoxSchema.findOne({name: name});
    if (existing) {
        throw new Error(`Element ${name} already exists`);
    }
    return await StuffingBoxSchema.create({
        name,
        type,
        position,
        d1,
        d2,
        D,
        h1,
        H
    });
};

const edit = async (id, name, type, position, d1, d2, D, h1, H) => {
    const existing = await StuffingBoxSchema.findOne({_id: id});
    if (!existing) {
        throw new Error(`Element ${_id} not found`);
    }

    const updates = {};
    if (name) updates.name = name;
    if (type) updates.type = type;
    if (position) updates.position = position;
    if (d1) updates.d1 = d1;
    if (d2) updates.d2 = d2;
    if (D) updates.D = D;
    if (h1) updates.h1 = h1;
    if (H) updates.H = H;

    if (Object.keys(updates).length === 0) {
        return existing;
    }

    return StuffingBoxSchema.findOneAndUpdate({_id: id}, updates, {
        new: true,
    });
};

const getById = async (id) => {
    const element = await StuffingBoxSchema.findById(id);
    if (!element) {
        throw new Error(`Element with id: ${id} not found`);
    }
    return element;
};

const deleteElement = async (id) => {
    const element = await StuffingBoxSchema.findByIdAndRemove(id);
    if (!element) {
        throw new Error(`Element with id: ${id} not found`);
    }
    return element;
};

module.exports = {
    getAll,
    getByName,
    createNew,
    edit,
    getById,
    deleteElement,
    getAnalogs
}