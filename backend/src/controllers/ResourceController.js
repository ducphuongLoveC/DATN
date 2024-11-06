import Resource from "../models/Resource.js";

class ResourceController {
  async getResource(req, res, next) {
    try {
      const { id } = req.params;
      let resource;

      if (!id) {
        resource = await Resource.findOne().sort({ _id: 1 });
      } else {
        resource = await Resource.findOne({ _id: id });
      }

      if (!resource) {
        resource = await Resource.findOne().sort({ _id: 1 });
      }

      res.status(200).json(resource);
    } catch (error) {
      next(error);
    }
  }

  async getAdjacentResourceId(req, res, next) {
    try {
      const { id } = req.params;
      const { direction } = req.query;

      const currentResource = await Resource.findById(id);
      if (!currentResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      const module_id = currentResource.module_id;
      let resource;

      if (direction === "previous") {
        resource = await Resource.findOne({
          _id: { $lt: id },
          module_id: module_id,
        }).sort({ _id: -1 });

        if (!resource) {
          return res.status(200).json({ id });
        }
      } else if (direction === "next") {
        resource = await Resource.findOne({
          _id: { $gt: id },
          module_id: module_id,
        }).sort({ _id: 1 });

        if (!resource) {
          return res.status(200).json({ id });
        }
      } else {
        return res.status(400).json({
          message: 'Invalid direction parameter. Use "previous" or "next".',
        });
      }

      res.status(200).json({ id: resource._id });
    } catch (error) {
      next(error);
    }
  }
}

export default new ResourceController();
