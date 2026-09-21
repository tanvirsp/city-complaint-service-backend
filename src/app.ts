import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";

import { authRoutes } from "./modules/auth/auth.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { categoryRoutes } from "./modules/category/category.route";
import { userRoutes } from "./modules/user/user.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { complaintRoutes } from "./modules/complaint/complaint.route";
import { serviceRoutes } from "./modules/service/service.route";
import { serviceRequestRoutes } from "./modules/serviceRequest/serviceRequest.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import { staffRoutes } from "./modules/staff/staff.route";

const app: Application = express();

app.use(
  cors({
    origin: [
      config.app_url as string,
      "http://localhost:3000",
      "https://rent-nest-frontend-d9fl.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("City Complaint & Service Platform Running");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/service-request", serviceRequestRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/staff", staffRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
