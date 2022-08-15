import { schedule, Handler } from "@netlify/functions";

const _handler: Handler = async function (event, context) {
  console.log("Received event:", event);

  return {
    statusCode: 200,
  };
};

const handler = schedule("* * * * *", _handler);

export { handler };
