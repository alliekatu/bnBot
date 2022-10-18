import os
from dotenv import load_dotenv
load_dotenv()
from statistics import mode
from ossapi import *
import math
from datetime import date, timedelta
import numpy as np
api = OssapiV2(os.getenv("CLIENT_ID"), os.getenv("CLIENT_SECRETa"), "http://localhost:727/")

class User(object):
    def __init__(self, user_id):
        self.user_id = user_id

class Beatmap():
    def __init__(self, beatmap_id):
        self.beatmap_id = beatmap_id

class BeatmapNominator(User):
    def __init__(self, user_id, time_as_bn=0, probationary=False):
        super().__init__(user_id)
        self.drain_scale = 0.73
        self.drain_constant = 0.21
        self.newmapper_invcoeff = 2.89
        self.newmapper_yint = 3.67
        self.bn_scale = 0.67
        self.dq_scale = 18.68
        self.get_bng_history()
        self.unique_nominations()

    def get_bng_history(self):
        self.nominations = (api.beatmapset_events(types=[BeatmapsetEventType.NOMINATE],user_id=self.user_id,limit=50,min_date={(date.today()-timedelta(days=90)).isoformat()}).events)
        self.nomination_resets = (api.beatmapset_events(types=[BeatmapsetEventType.NOMINATION_RESET_RECEIVED],user_id=self.user_id,limit=50,min_date={(date.today()-timedelta(days=90)).isoformat()}).events)
    
    def unique_nominations(self):
        self.uniquenominations_id = [nomination.beatmapset.id for nomination in self.nominations if 'osu' in nomination.comment.modes]
        self.uniquenominations_id = list(set(self.uniquenominations_id))

def geometric_mean(x):
    return np.exp(np.log(x).mean())

def beatmap_information(bset_id):
    beatmapset_list = api.beatmapset(beatmapset_id=bset_id).beatmaps
    return sum([diff.total_length for diff in beatmapset_list]), [diff.difficulty_rating for diff in beatmapset_list], 1 if beatmapset_list[0].status.value == 1 else 0, api.beatmap(beatmap_id=beatmapset_list[0].id)._beatmapset.user_id

def nomination_score(bn, total_drain_time, ranked_maps, mapper_is_bn, is_ranked=1):
    return (bn.drain_scale * (math.log(math.log(total_drain_time))+bn.drain_constant)*(bn.newmapper_yint*math.exp(-ranked_maps/bn.newmapper_invcoeff)+1)*(1-bn.bn_scale*mapper_is_bn)*(is_ranked))

def mapper_information(u_id):
    group_list = api.user(user=u_id).groups
    return total_ranked(u_id), sum([1 for group in group_list if "Beatmap Nominator" in group.name and "osu" in group.playmodes])

def total_ranked(u_id):
    return (api.user(user=u_id).ranked_beatmapset_count)

Aqua	= BeatmapNominator(user_id=	7150015	)
Syncro	= BeatmapNominator(user_id=	4338923	)
Aakki	= BeatmapNominator(user_id=	11077540	)
Dada	= BeatmapNominator(user_id=	9119507	)
Didah	= BeatmapNominator(user_id=	8030129	)
Hinsvar	= BeatmapNominator(user_id=	1249323	)
Log_Off_Now	= BeatmapNominator(user_id=	4378277	)
NeKroMan4ik	= BeatmapNominator(user_id=	11387664	)
Nozhomi	= BeatmapNominator(user_id=	2716981	)
Okoratu	= BeatmapNominator(user_id=	1623405	)
riffy	= BeatmapNominator(user_id=	597957	)
Usaha	= BeatmapNominator(user_id=	6443117	)
tomatas95	= BeatmapNominator(user_id=	11403815	)
Flask	= BeatmapNominator(user_id=	959763	)
VINXIS	= BeatmapNominator(user_id=	4323406	)
fieryrage	= BeatmapNominator(user_id=	3533958	)
Yogurtt	= BeatmapNominator(user_id=	2649717	)
Kyle_Y	= BeatmapNominator(user_id=	3565813	)
rosario_wknd	= BeatmapNominator(user_id=	6341518	)
timemon	= BeatmapNominator(user_id=	2072005	)
Yugu	= BeatmapNominator(user_id=	3161834	)
jonathanlfj	= BeatmapNominator(user_id=	270377	)
Lasse	= BeatmapNominator(user_id=	896613	)
Vararaup	= BeatmapNominator(user_id=	8257675	)
Sajinn	= BeatmapNominator(user_id=	13513687	)
Morrighan	= BeatmapNominator(user_id=	12042090	)
KeyWee	= BeatmapNominator(user_id=	10476879	)
Nevo	= BeatmapNominator(user_id=	7451883	)
neonat	= BeatmapNominator(user_id=	1561995	)
Uberzolik	= BeatmapNominator(user_id=	1314547	)
Aistre	= BeatmapNominator(user_id=	4879380	)
AJT	= BeatmapNominator(user_id=	3181083	)
Amamya	= BeatmapNominator(user_id=	1997633	)
Andrea	= BeatmapNominator(user_id=	33599	)
Apo11o	= BeatmapNominator(user_id=	9558549	)
Beomsan	= BeatmapNominator(user_id=	3626063	)
Cellina	= BeatmapNominator(user_id=	2490770	)
eiri	= BeatmapNominator(user_id=	3388410	)
Enneya	= BeatmapNominator(user_id=	10959501	)
Iceluin	= BeatmapNominator(user_id=	3558897	)
Len	= BeatmapNominator(user_id=	1686145	)
Luscent	= BeatmapNominator(user_id=	2688581	)
Mafumafu	= BeatmapNominator(user_id=	3076909	)
Mirash	= BeatmapNominator(user_id=	2841009	)
mnyui	= BeatmapNominator(user_id=	14261540	)
Noffy	= BeatmapNominator(user_id=	1541323	)
Ryuusei_Aika	= BeatmapNominator(user_id=	7777875	)
Saggin	= BeatmapNominator(user_id=	12464107	)
Shmiklak	= BeatmapNominator(user_id=	5504231	)
SMOKELIND	= BeatmapNominator(user_id=	9327302	)
Sotarks	= BeatmapNominator(user_id=	4452992	)
TheKingHenry	= BeatmapNominator(user_id=	5128277	)
wafer	= BeatmapNominator(user_id=	9416836	)


def compute_nomination_score(bn_object):
    total = 0
    bng_bias = 0
    avg_drain_time = 0
    experienced_mapper_bias = []
    for nomination_index, beatmap_id_val in enumerate(bn_object.uniquenominations_id):
        try:
            map_info = beatmap_information(beatmap_id_val)
            if map_info[2] == 1:
                mapper_info = mapper_information(beatmap_information(beatmap_id_val)[3])
                individual_score = nomination_score(bn=bn_object, total_drain_time=map_info[0],ranked_maps=(mapper_info[0]),mapper_is_bn=(mapper_info[1]))
                #print(f'Score for {api.beatmapset(beatmapset_id=beatmap_id_val).beatmaps[0].url}: {individual_score}')
                avg_drain_time+=(map_info[0])
                experienced_mapper_bias += [mapper_info[0]] 
                bng_bias += (mapper_info[1])
                total += individual_score
        except:
            pass
    total -= bn_object.dq_scale*(math.exp(len(bn_object.nomination_resets)/nomination_index)-1)
    return total

print(f'Aqua  {compute_nomination_score(Aqua)}')
print(f'Syncro  {compute_nomination_score(Syncro)}')
print(f'Aakki  {compute_nomination_score(Aakki)}')
print(f'Dada  {compute_nomination_score(Dada)}')
print(f'Didah  {compute_nomination_score(Didah)}')
print(f'Hinsvar  {compute_nomination_score(Hinsvar)}')
print(f'Log_Off_Now  {compute_nomination_score(Log_Off_Now)}')
print(f'NeKroMan4ik  {compute_nomination_score(NeKroMan4ik)}')
print(f'Nozhomi  {compute_nomination_score(Nozhomi)}')
print(f'Okoratu  {compute_nomination_score(Okoratu)}')
print(f'riffy  {compute_nomination_score(riffy)}')
print(f'Usaha  {compute_nomination_score(Usaha)}')
print(f'tomatas95  {compute_nomination_score(tomatas95)}')
print(f'Flask  {compute_nomination_score(Flask)}')
print(f'VINXIS  {compute_nomination_score(VINXIS)}')
print(f'fieryrage  {compute_nomination_score(fieryrage)}')
print(f'Yogurtt  {compute_nomination_score(Yogurtt)}')
print(f'Kyle_Y  {compute_nomination_score(Kyle_Y)}')
print(f'rosario_wknd  {compute_nomination_score(rosario_wknd)}')
print(f'timemon  {compute_nomination_score(timemon)}')
print(f'Yugu  {compute_nomination_score(Yugu)}')
print(f'jonathanlfj  {compute_nomination_score(jonathanlfj)}')
print(f'Lasse  {compute_nomination_score(Lasse)}')
print(f'Vararaup  {compute_nomination_score(Vararaup)}')
print(f'Sajinn  {compute_nomination_score(Sajinn)}')
print(f'Morrighan  {compute_nomination_score(Morrighan)}')
print(f'KeyWee  {compute_nomination_score(KeyWee)}')
print(f'Nevo  {compute_nomination_score(Nevo)}')
print(f'neonat  {compute_nomination_score(neonat)}')
print(f'Uberzolik  {compute_nomination_score(Uberzolik)}')
print(f'Aistre  {compute_nomination_score(Aistre)}')
print(f'AJT  {compute_nomination_score(AJT)}')
print(f'Amamya  {compute_nomination_score(Amamya)}')
print(f'Andrea  {compute_nomination_score(Andrea)}')
print(f'Apo11o  {compute_nomination_score(Apo11o)}')
print(f'Beomsan  {compute_nomination_score(Beomsan)}')
print(f'Cellina  {compute_nomination_score(Cellina)}')
print(f'eiri  {compute_nomination_score(eiri)}')
print(f'Enneya  {compute_nomination_score(Enneya)}')
print(f'Iceluin  {compute_nomination_score(Iceluin)}')
print(f'Len  {compute_nomination_score(Len)}')
print(f'Luscent  {compute_nomination_score(Luscent)}')
print(f'Mafumafu  {compute_nomination_score(Mafumafu)}')
print(f'Mirash  {compute_nomination_score(Mirash)}')
print(f'mnyui  {compute_nomination_score(mnyui)}')
print(f'Noffy  {compute_nomination_score(Noffy)}')
print(f'Ryuusei_Aika  {compute_nomination_score(Ryuusei_Aika)}')
print(f'Saggin  {compute_nomination_score(Saggin)}')
print(f'Shmiklak  {compute_nomination_score(Shmiklak)}')
print(f'SMOKELIND  {compute_nomination_score(SMOKELIND)}')
print(f'Sotarks  {compute_nomination_score(Sotarks)}')
print(f'TheKingHenry  {compute_nomination_score(TheKingHenry)}')
print(f'wafer  {compute_nomination_score(wafer)}')