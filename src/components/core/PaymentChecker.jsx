import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export const PaymentChecker = () => {
  const [result, setResult] = useState("");

  const validationSchema = Yup.object({
    dueDate: Yup.string().required("Due date is required"),
    payCycle: Yup.string().required("Payment cycle is required"),
  });

  const calculatePayDate = (values) => {
    const { dueDate, payCycle } = values;
    const due = new Date(dueDate);

    // Extract cycle day using regex
    const match = payCycle.match(/\d+/);
    let cycleDay = match ? parseInt(match[0]) : NaN;

    if (isNaN(cycleDay)) {
      setResult("Invalid payment cycle format");
      return;
    }

    // Find last valid day of the month
    let lastDayOfMonth = new Date(due.getFullYear(), due.getMonth() + 1, 0).getDate();
    if (cycleDay > lastDayOfMonth) {
      cycleDay = lastDayOfMonth;
    }

    let payDate = new Date(due.getFullYear(), due.getMonth(), cycleDay);
    if (payDate < due) {
      const nextMonth = new Date(due.getFullYear(), due.getMonth() + 1, 1);
      lastDayOfMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
      cycleDay = Math.min(cycleDay, lastDayOfMonth);
      payDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), cycleDay);
    }

    setResult(`Your invoice pay date will be ${payDate.toDateString()}`);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-full">
      <h3 className="text-xl font-bold text-center text-info mb-4">Payment Date Checker</h3>
      
      <Formik
        initialValues={{ dueDate: "", payCycle: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => calculatePayDate(values)}
      >
        {() => (
          <Form className="space-y-4">
        
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <Field type="date" name="dueDate" className="border p-2 w-full rounded" />
              <ErrorMessage name="dueDate" component="p" className="text-danger text-sm mt-1" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Cycle</label>
              <Field as="select" name="payCycle" className="border p-2 w-full rounded">
                <option value="">Select Payment Cycle</option>
                <option value="Every month on the 30th">Every month on the 30th</option>
                <option value="Every month on the 15th">Every month on the 15th</option>
              </Field>
              <ErrorMessage name="payCycle" component="p" className="text-danger text-sm mt-1" />
            </div>

            <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
              Check Payment Date
            </button>
          </Form>
        )}
      </Formik>

      {result && <p className="mt-4 text-success text-center">{result}</p>}
    </div>
  );
}  