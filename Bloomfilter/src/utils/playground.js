const BloomFilter = require('./bloomFilter');

const bloomFilter = new BloomFilter(20, 0.05);

const wordPresent = [
  'abound',
  'abounds',
  'abundance',
  'abundant',
  'accessible',
  'bloom',
  'blossom',
  'bolster',
  'bonny',
  'bonus',
  'bonuses',
  'coherent',
  'cohesive',
  'colorful',
  'comely',
  'comfort',
  'gems',
  'generosity',
  'generous',
  'generously',
  'genial',
];
const wordAbsent = [
  'bluff',
  'cheater',
  'hate',
  'war',
  'humanity',
  'racism',
  'hurt',
  'nuke',
  'gloomy',
  'facebook',
  'geeksforgeeks',
  'twitter',
];

wordPresent.forEach((word) => {
  bloomFilter.add(word);
});

const testSample = [...wordPresent.slice(1, 10), ...wordAbsent];

const checkSample = (sample) => {
  console.log(`Hi there...
  Size of bit array: ${bloomFilter.size}
  False positive Probability: ${bloomFilter.falseProb}
  Number of hash functions used: ${bloomFilter.hashCount}`);

  let falsePositiveCount = 0;
  sample.forEach((word) => {
    console.log('Here is the word --->', word);
    if (bloomFilter.contains(word)) {
      if (wordAbsent.includes(word)) {
        falsePositiveCount += 1;
        console.log(`"${word}" is a false positive!`);
      } else {
        console.log(`"${word}" is probably present!`);
      }
    } else {
      console.log(`"${word}" is definitely not present!`);
    }
  });

  console.log('Total number of false positives -->', falsePositiveCount);
};

checkSample(testSample);
