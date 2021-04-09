function chunk(array, chunkSize, transformChunk = c => c) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) chunks.push(array.slice(i, i + chunkSize));
    return chunks.map(transformChunk);
}

// An example with an array of numbers:
const numbers = Array.from({ length: 15 }, (_, i) => (i + 1) * 2);
// Only show 5 numbers per page, and display each chunk as a string showing the indice in the chunk
// and
const pages = chunk(numbers, 5, (slice, i) => {
    const buf = [`Page ${i + 1}/3`];
    buf.push(...slice.map((num, index) => `${i * 5 + index + 1}) ${num}`));
    return buf.join('\n');
});

// try (cmd){purge} || when user call __ inverted 


for (const page of pages) console.log(page);