import DatePicker from "react-datepicker";
import { cn } from "../../utils";

interface Props {
  dateTo: Date | null;
  // eslint-disable-next-line no-unused-vars
  setDateTo: (param: Date | null) => void;
  placeholder?: string;
  className?: string;
}

const CustomDateTo = ({ dateTo, setDateTo, placeholder, className }: Props) => {
  return (
    <DatePicker
      renderCustomHeader={({
        monthDate,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            disabled={prevMonthButtonDisabled}
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            <span className="month">
              {monthDate.toLocaleString("en-US", {
                month: "long",
              })}
            </span>
            <span className="year">
              {monthDate.toLocaleString("en-US", {
                year: "numeric",
              })}
            </span>
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            disabled={nextMonthButtonDisabled}
            // style={
            //   customHeaderCount === 0 ? { visibility: "hidden" } : null
            // }
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      selected={dateTo}
      monthAriaLabelPrefix="text"
      monthsShown={1}
      onChange={(dateVal) => setDateTo(dateVal)}
      placeholderText={placeholder ? placeholder : "End date"}
      className={cn([
        "z-[30] mt-[5px] box-border  w-full flex-shrink-0 rounded-md border px-4 py-2 ",
        className,
      ])}
      maxDate={new Date()}
      dateFormat="dd MMMM yyyy"
    />
  );
};

export default CustomDateTo;
