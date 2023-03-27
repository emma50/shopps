import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import { DesktopDatePicker, LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./coupons.module.scss";

export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(coupon.coupon);
  const [discount, setDiscount] = useState(coupon.discount);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(coupon.startDate);
  const [endDate, setEndDate] = useState(coupon.endDate);
  
  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const input = useRef(null);

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/coupon", {
        data: { id },
      });

      setCoupons(data.coupons);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/coupon", {
        id,
        coupon: name,
        discount: Number(discount),
        startDate: startDate,
        endDate: endDate,
      });
      
      setCoupons(data.coupons);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
        placeholder='Coupon name'
      />
      {open && (
        <div className={styles.list__item_expand}>
          <input
            className={open ? styles.open : ""}
            type="text"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            disabled={!open}
            placeholder='Discount name'
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={parseInt(startDate)}
              onChange={handleStartDate}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date()}
            />{' '}
            <DatePicker
              label="End Date"
              inputFormat="MM/dd/yyyy"
              value={parseInt(endDate)}
              onChange={handleEndDate}
              renderInput={(params) => <TextField {...params} />}
              minDate={tomorrow}
            />
          </LocalizationProvider>
          <button
            className={`${styles.btn} ${styles.coupon_btn}`}
            onClick={() => handleUpdate(coupon._id)}
          >
            Save
          </button>
          <button
            className={`${styles.btn} ${styles.coupon_btn}`}
            onClick={() => {
              setOpen(false);
              setName(coupon.coupon);
              setDiscount(coupon.discount);
              setStartDate(parseInt(coupon.startDate));
              setEndDate(parseInt(coupon.endDate));
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              console.log('OPEN', open)
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(coupon._id)} />
      </div>
    </li>
  );
}
