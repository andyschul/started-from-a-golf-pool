const redis = require('redis')
const schedule = require('node-schedule');
const {promisify} = require('util');
const api = require('./api');
require('dotenv').config();

const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);

// TRIGGER TOURNAMENT SCHEDULER CREATION ONCE PER YEAR
schedule.scheduleJob('0 0 1 1 *', function(){
  createSchedulers();
});
console.log(`Created scheduler: Yearly Tournament Scheduler`);


// CREATE INDIVIDUAL TOURNAMENT SCHEDULERS
async function createSchedulers() {
  let currentYear = (new Date()).getFullYear();
  let tourneySchedule;
  let res = await getAsync(`schedule:${currentYear}`);
  if (res) {
    tourneySchedule = JSON.parse(res);
  } else {
    tourneySchedule = await api.getYearlySchedule();
  }
  if (!tourneySchedule.hasOwnProperty('tournaments')) {
    console.error('Could not get tournament schedule');
    return;
  }

  let now = new Date();
  for (let tourney of tourneySchedule.tournaments) {
    let tourneyDate = new Date(`${tourney.start_date}T00:00:00`);
    if (tourneyDate > now) {
      // Create scheduler to run every 5th hour, starting 3 days prior to tournament
      let startDay = new Date(tourneyDate.getTime());
      startDay.setDate(startDay.getDate() - 3);

      schedule.scheduleJob({ start: startDay, end: tourneyDate, rule: '0 */5 * * *' }, function(){
        let teeTimes = api.getTeeTimes(tourney.id);
        if (teeTimes.hasOwnPropery('pairings')) {
          this.cancel();
        }
      });
      console.log(`Created scheduler: ${tourney.name} ${currentYear}`);
    }
  }
}

createSchedulers();