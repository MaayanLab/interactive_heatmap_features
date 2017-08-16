'''
Python 2.7
The clustergrammer python module can be installed using pip:
pip install clustergrammer

or by getting the code from the repo:
https://github.com/MaayanLab/clustergrammer-py
'''

from clustergrammer import Network
net = Network()

# load matrix tsv file
net.load_file('txt/heatmap_features.txt')

net.set_cat_color('row', 1, 'Feature Type: Interactivity', 'yellow')
net.set_cat_color('row', 1, 'Feature Type: Sharing', 'blue')
net.set_cat_color('row', 1, 'Feature Type: Usability', 'orange')
net.set_cat_color('row', 1, 'Feature Type: Biology-Specific', 'red')

net.cluster(dist_type='cos',views=[] , dendro=True,
               filter_sim=0.1, calc_cat_pval=False, enrichrgram=False)

# write jsons for front-end visualizations
net.write_json_to_file('viz', 'json/mult_view.json', 'indent')
