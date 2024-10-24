import Access from "../models/Access.js";

class AccessController {
  async create(req, res, next) {
    try {
      const data = await Access.create(req.body);
      if (data) {
        return res.status(201).json({
          success: true,
          data,
          message: "create successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Access.find().populate('course');
      if (data) {
        return res.status(201).json({
          success: true,
          data,
          message: "get successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req, res, next) {
    try {
      const data = await Access.findById(req.params.id).populate('course');
      if (data) {
        return res.status(201).json({
          success: true,
          data,
          message: "getDetail successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await Access.findByIdAndDelete(req.params.id);
      if (data) {
        return res.status(201).json({
          success: true,
          data,
          message: "delete successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Access.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (data) {
        return res.status(201).json({
          success: true,
          data,
          message: "getDetail successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new AccessController();
