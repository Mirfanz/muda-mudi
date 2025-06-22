import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale("id");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default dayjs;
