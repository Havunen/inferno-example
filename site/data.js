// Create dummy data

// 1000 entries
const array = [];

for (let i = 0; i < 1000; i++) {
    array.push({
        id: i,
        name: `${i%3}${i%5}# Code ${i*2}`,
        number: i * 100
    })
}

export const data = array;
