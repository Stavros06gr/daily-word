fetch('words.json')
      .then(response => response.json())
      .then(words => {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const wordIndex = dayOfYear % words.length;
        const wordEntry = words[wordIndex];

        console.log("Today day of the year: ", dayOfYear);
        console.log("Total number of objects:", words.length);
        console.log("dayIndex: ", wordIndex);

        const lines = [];

        lines.push({ label: "English", value: wordEntry.word });
        for (const [lang, translation] of Object.entries(wordEntry.translations)) {
          const label = lang.charAt(0).toUpperCase() + lang.slice(1);
          lines.push({ label: label, value: translation });
        }

        document.getElementById('translations').innerHTML = lines
          .map(line => `
            <div class="line">
              <div class="label">${line.label}:</div>
              <div class="value">${line.value}</div>
            </div>
          `)
          .join('');
      })
      .catch(error => {
        document.getElementById('translations').innerHTML = `<div class="line">Error loading data</div>`;
        console.error('Error loading JSON:', error);
      });