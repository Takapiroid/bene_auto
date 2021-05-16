const dotenv = require("dotenv");
const { format } = require("date-fns");
const { post, get } = require("../");

const protocol = "https://";
const host = "flabuless.ne.jp";

// サーバー起動時に叩きたい
dotenv.config();

function apiTokenAuth() {
  const username = process.env.BENE_USER_NAME;
  const password = process.env.BENE_PASSWORD;
  const path = "/v8/api-token-auth/";
  const url = protocol + host + path;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  var data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);
  return post(url, data, headers)
    .then((response) => {
      saveApiToken(response.data.token);
      return response.data;
    })
    .catch((error) => error.response.data);
}

/**
 * 活動記録アップロード
 * @param {string} type
 *    three_meals           // 3食記録
 *    sleep_six_hours       // 6時間睡眠
 *    relax                 // リラックス
 *    thermometry           // 体温
 *    staggered_work        // 3密回避
 *    hand_washing_gargle   // 手洗いうがい
 *    self_restraint        // 不要不急の外出
 * @param {Date} date
 * @param {string} raw
 *    任意（activity_type: relax時のみ必須）
 */
function uploadActivity(type, date, raw = "音楽") {
  if (!hasToken) {
    throw new Error("APIトークンが取得できていません");
  }
  const path = "/v8/activities/";
  const data = {
    source: "manual",
    activity_type: type,
    start_time: formatDate(date), // "2021-04-17T17:10:00+09:00"の形式
  };
  if (type === "relax") {
    data["raw_activity_type"] = raw;
  }
  const url = protocol + host + path;
  return post(url, data, getApiTokenHeader())
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response?.data));
}

function fetchTotalPoint() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...getApiTokenHeader(),
  };
  const path = "/v8/total-points/";
  const url = protocol + host + path;
  const data = "date=";
  return post(url, data, headers)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

function fetchService() {
  const headers = getApiTokenHeader();
  const path = "/v8/services/";
  const url = protocol + host + path;
  return get(url, headers)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

function uploadStepCount(date, steps) {
  const headers = getApiTokenHeader();
  const path = "/v8/steps-bulk/?";
  const url = protocol + host + path;
  const data = {
    steplist: [
      {
        total_calories: "0",
        duration: "0",
        start_time: formatDate(date),
        total_distance: "0",
        steps,
      },
    ],
  };
  return post(url, data, headers)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

function saveApiToken(token) {
  console.log("saved token", token);
  process.env.BENE_API_TOKEN = token;
}

function getApiTokenHeader() {
  return { Authorization: `Token ${process.env.BENE_API_TOKEN}` };
}

function hasToken() {
  console.log("token", token);
  return !!process.env.BENE_API_TOKEN;
}

function formatDate(date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
}

const from = new Date("2021-01-01");
const to = new Date("2021-04-31");
const days = Math.round(to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000);
const activities = [
  "three_meals",
  "sleep_six_hours",
  "relax",
  "thermometry",
  "staggered_work",
  "hand_washing_gargle",
  "self_restraint",
];
const stepCountRange = [8000, 15000];
const createRandomStepCount = () => {
  const randomNum = Math.random();
  const [min, max] = stepCountRange;
  return min + randomNum * (max - min);
};

apiTokenAuth().then(async () => {
  const promises = [];
  for (let i = 0; i < days; i++) {
    const process = () => {
      const date = new Date(new Date(from).setDate(from.getDate() + i));
      const steps = createRandomStepCount();
      console.log(`### DATE: ${date}`);
      return Promise.all([
        activities.map((activity) =>
          uploadActivity(activity, date)
            .then(() => console.log(` - ${activity} is success`))
            .catch((error) => console.log(` - ${activity} is error: `, error))
        ),
        uploadStepCount(date, steps)
          .then(() => console.log(` - step_count : ${steps}step is success`))
          .catch((error) => console.log(` - step_count is error: `, error)),
      ]);
    };
    promises.push(process);
  }
  await promises.reduce((a, b) => a.then(b), Promise.resolve());
  fetchTotalPoint().then((data) => {
    console.log("==============================");
    console.log(`total_point = ${data["total_points"]}`);
  });
});
