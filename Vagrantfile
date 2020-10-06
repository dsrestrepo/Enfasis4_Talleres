Vagrant.require_version ">= 1.8.7"

VAGRANTFILE_API_VERSION = "2"

MEMORY = 4500
CPU_COUNT = 2

# map the name of the git branch that we use for a release
# to a name and a file path, which are used for retrieving
# a Vagrant box from the internet.
openedx_releases = {
  "open-release/ficus.1rc3" => "ficus-fullstack-2017-02-07",
  "open-release/ficus.1rc4" => "ficus-fullstack-2017-02-15",
  "open-release/ficus.1" => "ficus-fullstack-2017-02-15",
  "open-release/ficus.2" => "ficus-fullstack-2017-03-28",
  "open-release/ficus.3" => "ficus-fullstack-2017-04-20",
  "open-release/ficus.4" => "ficus-fullstack-2017-08-10",

  "open-release/eucalyptus/1rc1" => "eucalyptus-fullstack-1rc1",
  "open-release/eucalyptus.1rc2" => "eucalyptus-fullstack-2016-08-19",
  "open-release/eucalyptus.1" => "eucalyptus-fullstack-2016-08-25",
  "open-release/eucalyptus.2" => "eucalyptus-fullstack-2016-09-01",

  "named-release/dogwood" => {
    :name => "dogwood-fullstack-rc2", :file => "20151221-dogwood-fullstack-rc2.box",
  },
  "named-release/dogwood.1" => {
    :name => "dogwood-fullstack-rc2", :file => "20151221-dogwood-fullstack-rc2.box",
  },
  "named-release/dogwood.2" => {
    :name => "dogwood-fullstack-rc2", :file => "20151221-dogwood-fullstack-rc2.box",
  },
  "named-release/dogwood.3" => {
    :name => "dogwood-fullstack-rc2", :file => "20151221-dogwood-fullstack-rc2.box",
  },
  "named-release/dogwood.rc" => {
    :name => "dogwood-fullstack-rc2", :file => "20151221-dogwood-fullstack-rc2.box",
  },
  # Cypress is deprecated and unsupported
  # Birch is deprecated and unsupported
}
openedx_releases.default = "ficus-fullstack-2017-08-10"

openedx_release = ENV['OPENEDX_RELEASE']
boxname = ENV['OPENEDX_BOXNAME']

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  boxfile = ""
  if not boxname
    reldata = openedx_releases[openedx_release]
    if Hash == reldata.class
      boxname = openedx_releases[openedx_release][:name]
      boxfile = openedx_releases[openedx_release].fetch(:file, "")
    else
      boxname = reldata
    end
  end
  if boxfile == ""
    boxfile = "#{boxname}.box"
  end

  # Creates an edX fullstack VM from an official release
  config.vm.box     = boxname
  config.vm.box_url = "http://files.edx.org/vagrant-images/#{boxfile}"
  config.vm.box_check_update = false

  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.synced_folder  ".", "/vagrant", disabled: false
  config.ssh.insert_key = true

  config.hostsupdater.aliases = ["preview.localhost"]

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", MEMORY.to_s]
    vb.customize ["modifyvm", :id, "--cpus", CPU_COUNT.to_s]

    # Allow DNS to work for Ubuntu 12.10 host
    # http://askubuntu.com/questions/238040/how-do-i-fix-name-service-for-vagrant-client
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]

    # Virtio is faster, but the box needs to have support for it.  We didn't
    # have support in the boxes before Ficus.
    if !(boxname.include?("dogwood") || boxname.include?("eucalyptus"))
      vb.customize ['modifyvm', :id, '--nictype1', 'virtio']
    end
  end
end
