import Resource from '../models/Resource.js';

class ResourceController {
    async getResource(req, res, next) {
        try {
            const { id } = req.params; // Nhận ID từ params
            const { direction } = req.query; // Nhận direction từ query params
            let resource;

            if (direction === 'previous') {
                // Tìm video trước đó
                resource = await Resource.findOne({ _id: { $lt: id } }).sort({ _id: -1 });
            } else if (direction === 'next') {
                // Tìm video sau đó
                resource = await Resource.findOne({ _id: { $gt: id } }).sort({ _id: 1 });
            } else {
                // Nếu không có direction, tìm video theo ID hiện tại
                resource = await Resource.findOne({ _id: id });
            }
            if (!resource) {
                return res.status(404).json({ message: 'Resource not found' });
            }

            res.status(200).json(resource);
        } catch (error) {
            next(error);
        }
    }
    async getAdjacentResourceId(req, res, next) {
        try {
            const { id } = req.params; // Nhận ID từ params
            const { direction } = req.query; // Nhận direction từ query params
            let resource;
    
            if (direction === 'previous') {
                // Tìm video trước đó
                resource = await Resource.findOne({ _id: { $lt: id } }).sort({ _id: -1 });
                // Nếu không tìm thấy, trả về ID gốc
                if (!resource) {
                    return res.status(200).json({ id }); // Trả về ID gốc
                }
            } else if (direction === 'next') {
                // Tìm video sau đó
                resource = await Resource.findOne({ _id: { $gt: id } }).sort({ _id: 1 });
                // Nếu không tìm thấy, trả về ID gốc
                if (!resource) {
                    return res.status(200).json({ id }); // Trả về ID gốc
                }
            } else {
                return res.status(400).json({ message: 'Invalid direction parameter. Use "previous" or "next".' });
            }
    
            // Trả về ID của resource
            res.status(200).json({ id: resource._id }); // Trả về đối tượng với ID
        } catch (error) {
            next(error);
        }
    }
    
    
}

export default new ResourceController();
