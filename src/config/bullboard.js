import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import { emailQueue } from "../queue/email.queue.js";
import { pushQueue } from "../queue/push.queue.js";
import { smsQueue } from "../queue/sms.queue.js";
import { emailDLQ } from "../queue/DLQ.queue.js";

const serverAdapter=new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues: [
        new BullMQAdapter(emailQueue),
        new BullMQAdapter(pushQueue),
        new BullMQAdapter(smsQueue),
        new BullMQAdapter(emailDLQ)
    ],
    serverAdapter
});

export default serverAdapter;