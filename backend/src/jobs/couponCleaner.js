import cron from "node-cron";
import Coupon from "../models/Coupon.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    const result = await Coupon.deleteMany({ end_date: { $lt: now } });
    console.log(`Deleted ${result.deletedCount} expired coupons.`);
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
});
