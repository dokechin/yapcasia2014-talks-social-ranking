#!/usr/bin/env perl
use strict;
use warnings;
use Mojo::UserAgent;
use Mojo::URL;
use Mojo::JSON qw/j/;
binmode STDOUT, ":utf8";

my $ua = Mojo::UserAgent->new;
my $tx = $ua->get('http://yapcasia.org/2014/talk/list');

my $talks = [];
for my $n ( $tx->res->dom('div.talk')->each ) {
    my $talk = {
        icon_url => $n->at('div.icon a img')->attr('src'),
        speaker_name => $n->at('div.speaker p.name a')->text,
        title => $n->at('div.title a')->text,
        url => 'http://yapcasia.org' . $n->at('div.title a')->attr('href'),
    };

    print "Count...: $talk->{title}\n";
    print "Count...: $talk->{url}\n";
    print "Count...: $talk->{icon_url}\n";
    print "Count...: $talk->{speaker_name}\n";

    # Twitter-count
    $tx = $ua->get(
        Mojo::URL->new('http://urls.api.twitter.com/1/urls/count.json')->query( url => $talk->{url} )
    );
    $talk->{twitter_count} = j($tx->res->body)->{count} || 0;

    # Hatena-count
    $tx = $ua->get(
        Mojo::URL->new('http://api.b.st-hatena.com/entry.count')->query( url => $talk->{url} )
    );
    $talk->{hatena_count} = $tx->res->body || 0;

    # Facebook-count
    $tx = $ua->get(
        Mojo::URL->new('http://graph.facebook.com/')->query( id => $talk->{url} )
    );
    $talk->{facebook_count} = j($tx->res->body)->{shares} || 0;

    for (qw/twitter hatena facebook/) {
        $talk->{total_count} += $talk->{$_ . '_count'};
    }

    push @$talks, $talk;
}

my $filename = 'talks.json';
my $json = j($talks);
open my $fh, '>', $filename;
print $fh $json . "\n";
close $fh;
print "Wrote to... $filename\n";
