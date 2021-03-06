import { Collection, Guild, RichEmbed, User } from 'discord.js';
import { Bot } from '../Bot';
import IBook from '../interfaces/IBook';
import { flatArray, numberToEmoji } from '../utils';

export function confirmationEmbed(
    title: string,
    reason: string,
    color: string,
    moderator: User
): RichEmbed {
    return new RichEmbed()
        .setTitle(title)
        .addField('Reason', reason, true)
        .addField(
            'Moderator',
            `${moderator.username}#${moderator.discriminator}`
        )
        .setColor(color)
        .setDescription(
            'If you thing this is a mistake, please contact a moderator'
        );
}

export function serverInfo(
    {
        name,
        channels,
        iconURL,
        createdAt,
        memberCount,
        ownerID,
        roles,
        region,
    }: Guild,
    color: string,
    badWordsOn: boolean,
    logsOn: boolean
) {
    return new RichEmbed()
        .setColor(color)
        .setTitle(name)
        .setThumbnail(iconURL)
        .addField(
            'Creation at',
            `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`,
            true
        )
        .addField('Member count', memberCount, true)
        .addField('Owner', `<@${ownerID}>`, true)
        .addField('Role count', roles.size, true)
        .addField('Region', region, true)
        .addField(
            'Number of text channels',
            channels.filter(channel => channel.type === 'text').size,
            true
        )
        .addField(
            'Number of voice channels',
            channels.filter(channel => channel.type === 'voice').size,
            true
        )
        .addField('Bad words feature', badWordsOn ? 'on' : 'off', true)
        .addField('Logger feature', logsOn ? 'on' : 'off', true);
}

export function pfpEmbed(
    { displayAvatarURL, username }: User,
    color: string
): RichEmbed {
    return new RichEmbed()
        .setColor(color)
        .setTitle(`${username}'s profile picture`)
        .setImage(displayAvatarURL);
}

export function errorEmbed(error: string): RichEmbed {
    return new RichEmbed()
        .setTitle('Something went wrong 🙁')
        .setDescription(error)
        .setColor('#d32f2f');
}

export function aboutEmbed(
    color: string,
    ownerId: string,
    { guilds, modules, user: { displayAvatarURL } }: Bot
): RichEmbed {
    return new RichEmbed()
        .setTitle('About MiuBot')
        .setColor(color)
        .setThumbnail(displayAvatarURL)
        .addField('Language', 'Typescript', true)
        .addField(
            'Source code',
            '[Github](https://github.com/Webd01/Miu)',
            true
        )
        .addField(
            'Invite link',
            '[Invite](https://discordapp.com/oauth2/authorize?client_id=535082208667369482&scope=bot&permissions=2146958847)',
            true
        )
        .addField('Official server', '[Join](https://discord.gg/V9n936A)', true)
        .addField('Server count', guilds.size, true)
        .addField(
            'Command count',
            flatArray([...modules.values()]).length,
            true
        )
        .addField('Owner', `<@${ownerId}>`, true);
}

export function logEmbed(
    title: string,
    color: string,
    customFields: any = {}
): RichEmbed {
    const embed = new RichEmbed().setTitle(title).setColor(color);

    for (const [name, value] of Object.entries(customFields)) {
        embed.addField(name, value);
    }
    return embed;
}

export function badWordsList(color: string, badWords: string[]): RichEmbed {
    return new RichEmbed()
        .setTitle('List of bad words on this server')
        .setColor(color)
        .setDescription(badWords.join(', '));
}

export function issueEmbed(
    issue: string,
    { username, id }: User,
    invite: string,
    color: string
): RichEmbed {
    return new RichEmbed()
        .setColor(color)
        .setTitle(`New issue reported by ${username}`)
        .addField('Issue', issue)
        .addField('User', `<@${id}>`)
        .addField("Server's invite", invite);
}

export function serversList(
    guilds: Collection<string, Guild>,
    color: string
): RichEmbed {
    const embed = new RichEmbed()
        .setTitle(`Miu is currently in ${guilds.size} servers.`)
        .setColor(color);

    const servers =
        guilds.size > 25
            ? [...guilds.values()].slice(0, 25)
            : [...guilds.values()];

    for (const { name, memberCount } of servers) {
        embed.addField(name, `${memberCount} members`, true);
    }

    return embed;
}

export function booksResult(color: string, books: IBook[]): RichEmbed {
    const embed = new RichEmbed()
        .setTitle(`${books.length} results`)
        .setColor(color);
    books.forEach(({ title, summary, id }) =>
        embed.addField(`**${id}** - ${title}`, summary)
    );
    return embed;
}

export function bookInfo(
    color: string,
    {
        title,
        summary,
        moreInfoLink,
        thumbnail,
        authors,
        publishedDate,
        pageCount,
    }: IBook
): RichEmbed {
    return new RichEmbed()
        .setTitle(title)
        .setColor(color)
        .setThumbnail(thumbnail)
        .addField('Summary', `${summary} [More](${moreInfoLink})`, true)
        .addField('Author(s)', authors.join(', '), true)
        .addField('Published date', publishedDate, true)
        .addField('Page count', pageCount, true);
}
