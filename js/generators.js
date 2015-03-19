function random (seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function randomInt (seed, max, min) {
    if (!min) min = 0;
    return min + Math.floor(random(seed) * (max - min + 1));
}

function seedChoice (seed, choices) {
    return choices[Math.floor(random(seed) * choices.length)];
}

function someChoices(seed, choices, n) {
    var newChoices = choices.slice();
    var results = [];
    while (n > 0) {
        var index = Math.floor(random(seed + n) * newChoices.length);
        results.push(newChoices[index]);
        newChoices.splice(index, 1);
        n--;
    }
    return results;
}

function verb (seed) {
    return seedChoice(seed, verbs);
}

function noun (seed) {
    return seedChoice(seed, nouns);
}

function commonWord (seed) {
    if (random(seed) > 0.5) {
        return verb(seed);
    } else {
        return noun(seed);
    }
}

function seedChance (seed, chance) {
    return random(seed) < chance;
}

function capitalizeFirst (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function getBackground (seed) {
	return bgRoot + seedChoice(seed, backgrounds);
}

function getFont (seed) {
    var f = someChoices(seed, fonts, 5);
    var res = f[0];
    for (var i = 1; i < f.length; i++) {
        res = res + ", " + f[i];
    }
    return res;
}

function getAlpha (seed, min, max) {
  if (!min) min = 0;
  if (!max) max = 1;
  var ans = (min + (random(seed) * (max - min)));
  return Math.floor(ans * 100) / 100;
}

function getColor (seed) {
    return seedChoice(seed, mainColors);
}

function getLogo (seed) {
    var logo; 
    if (random(seed) < 0.5) {
        // Use Font Awesome
        logo = seedChoice(seed, fontAwesome);
        logo = '<i class="fa ' + logo + '"></i>';
    } else {
        // Use Glyphicons
        logo = seedChoice(seed, glyphicons);
        logo = '<span class="glyphicon ' + logo + '"></span>';
    }
    return logo;
}

/**
 * Returns an array of team member's photos and stuff. 
 */
function getTeam (seed) {
    var ratio = Math.min(random(seed), random(seed * 2));
    var size = randomInt(seed * 4, 2, 8); 
    var girlCount = Math.floor(size * ratio);
    var guyCount = size - girlCount;
    var girls = someChoices(seed, females, girlCount);
    var guys = someChoices(seed, males, guyCount);
    var jobs = someChoices(seed + 1, titles, girlCount + guyCount);
    var mult = 3;
    var results = [];
    var m = 0;
    var f = 0;
    while (m < guyCount || f < girlCount) {   
        if (random(seed * mult + 1) > 0.5 && f < girlCount) {
            // Add the next girl
            var name = femaleName(seed * mult) + " " + lastName(seed * mult + 2);
            var photo = femaleRoot + girls[f];
            var job = jobs[m + f];
            results.push({'name': name, 'photo': photo, 'job': job});
            f++;
        } else if (m < guyCount) {
            // Add the next guy
            var name = maleName(seed * mult) + " " + lastName(seed * mult + 2);
            var photo = maleRoot + guys[m];
            var job = jobs[m + f];
            results.push({'name': name, 'photo': photo, 'job': job});
            m++;
        }
        mult *= 3;
    }
    return results;
}

function removeLastVowel (seed) {
    var word = commonWord(seed);
    if (word.length <= 4) {
        return word;
    }
    var lastVowel = -1;
    for (var i = 0; i < word.length; i++) {
        if (word[i] == 'a' || word[i] == 'e' || word[i] == 'i' || word[i] == 'o' || word[i] == 'u') {
            lastVowel = i;
        }
    }
    if (lastVowel > -1) {
        return word.slice(0, lastVowel) + word.slice(lastVowel + 1);
    } else {
        return word;
    }
}

function startupify (seed) {
    var results = [];
    results.push(commonWord(seed) + "r");
    results.push(commonWord(seed) + "it");
    results.push(commonWord(seed) + "ly");
    results.push(commonWord(seed) + "ify");
    results.push(commonWord(seed) + "hub");
    results.push(commonWord(seed) + "y");
    results.push(commonWord(seed));
    results.push(commonWord(seed) + "me");
    results.push("you" + commonWord(seed));
    results.push(commonWord(seed) + "n");
    results.push(commonWord(seed) + "str");
    results.push(removeLastVowel(seed));
    results.push(commonWord(seed) + "Now");
    results.push(commonWord(seed) + "Link");
    results.push(commonWord(seed) + "in");
    results.push(commonWord(seed) + "able");
    results.push("Smart" + commonWord(seed));
    results.push(commonWord(seed) + capitalizeFirst(commonWord(seed + 1)));
    return capitalizeFirst(seedChoice(seed + 1, results));
}

//Here are functions to make slogans
function threeVerbs (seed) {
    var resultList = someChoices(seed, inspVerbs, 3);
    return (capitalizeFirst(resultList[0]) + ". " + capitalizeFirst(resultList[1]) + ". " + capitalizeFirst(resultList[2]) + ".");
}

function threeAdjs (seed) {
    var resultList = someChoices(seed, bizAdjs, 3);
    return (capitalizeFirst(resultList[0]) + ". " + capitalizeFirst(resultList[1]) + ". " + capitalizeFirst(resultList[2]) + ".");
}

function adjNoun (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "Your " + seedChoice(seed + 1, bizAdjs) + " " + seedChoice(seed, nouns) + ".";
    } else {
        return "Dare to " + commonWord(seed) + ".";
    }
}

function neverBefore (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "Like no other " + noun(seed) + ".";
    } else {
        return capitalizeFirst(commonWord(seed)) + " like never before.";
    }
}

function worldsMost (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "World's most " + seedChoice(seed + 1, bizAdjs) + " " + noun(seed) + ".";
    } else {
        return "The " + seedChoice(seed + 1, bizAdjs) + " way to " + verb(seed) + ".";
    }
}

function doSomethingGreat (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "The " + seedChoice(seed + 1, bizAdjs) + " " + noun(seed) + ".";
    } else {
        return capitalizeFirst(verb(seed)) + " something " + seedChoice(seed + 1, bizAdjs) + ".";
    }
}

function aShift (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "Your " + seedChoice(seed + 1, bizAdjs) + " new " + noun(seed) + ".";
    } else {
        return "We " + verb(seed) + ".";
    }
}

function madeEasy (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "The evolution of the " + noun(seed) + ".";
    } else {
        return "For those who " + verb(seed) + ".";
    }
}

function doYou (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "Your " + noun(seed) + ". " + capitalizeFirst(seedChoice(seed + 1, bizAdjs)) + ".";
    } else {
        return "Do you " + verb(seed) + "?";
    }
}

function youllNever (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "The " + noun(seed) + " you've been waiting for.";
    } else {
        var resultList = someChoices(seed, inspVerbs, 2);
        return  capitalizeFirst(resultList[0]) + ". " + capitalizeFirst(resultList[1]) + ". " + capitalizeFirst(verb(seed)) + ".";
    }
}

function doMore (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return capitalizeFirst(seedChoice(seed + 1, inspVerbs)) + " your " + noun(seed) + ".";
    } else {
        return "Start " + seedChoice(seed, gerunds) + ".";
    }
}

function ally (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return capitalizeFirst(seedChoice(seed + 1, inspGerunds)) + " your " + seedChoice(seed, nouns) + ".";
    } else {
        return capitalizeFirst(seedChoice(seed + 1, bizAdvbs)) + " " + seedChoice(seed, gerunds) + ".";
    }
}



function makeSlogan (seed) {
    var results = [];
    results.push(threeVerbs(seed));
    results.push(threeAdjs(seed));
    results.push(adjNoun(seed));
    results.push(neverBefore(seed));
    results.push(worldsMost(seed));
    results.push("We Are " + startupify(seed) + ".");
    results.push(doSomethingGreat(seed));
    results.push(aShift(seed));
    results.push(madeEasy(seed));
    results.push("Meet " + startupify(seed) + ".");
    results.push(doYou(seed));
    results.push(youllNever(seed));
    results.push(doMore(seed));
    results.push(ally(seed));
    return seedChoice(seed + 1000, results);
}

function maleName (seed) {
    var total = random(seed) * maleNameTotal;
    var i = 0;
    while (total > 0) {
        total -= maleWeights[i];
        i++
    }
    return maleNames[i];
}

function femaleName (seed) {
    var total = random(seed) * femaleNameTotal;
    var i = 0;
    while (total > 0) {
        total -= femaleWeights[i];
        i++
    }
    return femaleNames[i];
}

function lastName (seed) {
    var total = random(seed) * lastNameTotal;
    var i = 0;
    while (total > 0) {
        total -= lastWeights[i];
        i++
    }
    return lastNames[i];
}

//Here are functions to make openers
function isRevo (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return startupify(seed) + " is revolutionizing the way people think about " + seedChoice(seed, plurals) + ".";
    } else {
        return startupify(seed) + " replaces manual " + seedChoice(seed, gerunds) + " with an automated marketplace that matches businesses with customers. We eliminate waste and pass the savings to you.";
    }
}

function isLocal (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return startupify(seed) + " was created to help you find " + seedChoice(seed, plurals) + " in your area. From local " + seedChoice(seed, plurals) + " to national brands, no one knows " + seedChoice(seed, plurals) + " like " + startupify(seed) + ". No one.";
    } else {
        return startupify(seed) + " is a place for people who enjoy " + seedChoice(seed, gerunds) + " to connect. Find local " + seedChoice(seed, gerunds) + " events or just share your favorite tips and stories with others who love to " + seedChoice(seed, verbs) + ".";
    }
}

function shareAnd (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return "Share your favorite " + seedChoice(seed, plurals) + " and discover new ones. With " + startupify(seed) + " you never know what you might find!";
    } else {
        return startupify(seed) + " was founded by people who love " + seedChoice(seed, gerunds) + " just like you! Enter your favorite ways to " + seedChoice(seed, verbs) + " and we'll help you fit it all in. Since we're using " + seedChoice(seed, bizAdjs) + " technologies, you can count on us next time you " + seedChoice(seed, verbs) + ".";
    }
}

function theMax (seed) {
    if (seedChoice(seed, nouns) == commonWord(seed)) {
        return startupify(seed) + " is the last word in " + seedChoice(seed, bizAdjs) + " " + seedChoice(seed, plurals) + ". We know you never settle for less than the best and neither do we. " + capitalizeFirst(seedChoice(seed, inspVerbs)) + " with professional grade tools and " + seedChoice(seed + 1, inspVerbs) + " your future.";
    } else {
        return capitalizeFirst(seedChoice(seed, gerunds)) + ". Everyone talks about it but only the truly " + seedChoice(seed, bizAdjs) + " are able to " + seedChoice(seed, verbs) + " day in and day out. Here at " + startupify(seed) + " we understand your commitment and want to give you what you need to take your " + seedChoice(seed, gerunds) + " to the next level.";
    }
}

function makeOpener (seed) {
    var results = [];
    results.push(isRevo(seed));
    results.push(isLocal(seed));
    results.push(shareAnd(seed));
    results.push(theMax(seed));
    return seedChoice(seed + 999, results);;
}
