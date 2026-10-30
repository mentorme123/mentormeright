const fs = require('fs');
const dupes = JSON.parse(fs.readFileSync('/tmp/dupes_to_delete.json','utf8'));
console.log('Duplicates to delete:', dupes.length);
const emails = new Set(dupes.map(d => d.email));
const protected = ['mokksha@mentormeright.com','reyyan@mentormeright.com','test@mentormeright.com','mohammed@mentormeright.com','inara@mentormeright.com','seemas@oasisintschool.org'];
protected.forEach(e => console.log(e, '-> in delete list?', emails.has(e)));
// Show a sample
console.log('\nSample of delete list:');
dupes.slice(0,10).forEach(d => console.log(' ', d.email, '|', d.name, '| kept:', d.keptEmail));
// Check all emails are .com (old format) and none are CSV .in addresses
const csvIn = dupes.filter(d => d.email.endsWith('@mentormeright.in'));
console.log('\nDelete-list entries with .in domain (should be 0):', csvIn.length);
const csvEmails = dupes.filter(d => /^student\d+@mentormeright\.com$/.test(d.email));
console.log('Delete-list entries that are studentXXXX@mentormeright.com (should be 0):', csvEmails.length);